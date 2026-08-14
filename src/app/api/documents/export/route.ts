import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {
  Document as DocxDocument,
  Paragraph,
  TextRun,
  ImageRun,
  Packer,
  AlignmentType,
  HeadingLevel,
  Table as DocxTable,
  TableRow as DocxTableRow,
  TableCell as DocxTableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { readFileSync } from 'fs';
import { Buffer } from 'node:buffer';

function isBase64Image(value: string | null | undefined): boolean {
  if (!value) return false
  if (value.startsWith('data:image/')) return true
  try {
    const parsed = JSON.parse(value);
    return parsed?.type === 'image' && !!parsed.dataUrl;
  } catch { return false }
}

function decodeMediaImage(value: string | null | undefined): { buffer: Buffer; mimeType: string; width?: number; height?: number } | null {
  if (!value) return null;
  let dataUrl: string;
  let width: number | undefined;
  let height: number | undefined;
  if (value.startsWith('data:image/')) {
    dataUrl = value;
  } else {
    try {
      const parsed = JSON.parse(value);
      if (parsed?.type === 'image' && parsed.dataUrl) {
        dataUrl = parsed.dataUrl;
        width = parsed.width;
        height = parsed.height;
      } else return null;
    } catch { return null }
  }
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) return null;
  return { buffer: Buffer.from(matches[2], 'base64'), mimeType: matches[1], width, height };
}

function isMediaText(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith('{')) {
    try {
      const parsed = JSON.parse(value);
      if (parsed?.type === 'text') return parsed.text || null;
    } catch {}
    return null;
  }
  if (!value.startsWith('data:image')) return value;
  return null;
}

function renderContent(content: string, answers: Record<string, string>): string {
  let rendered = content;
  for (const [key, value] of Object.entries(answers)) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\$?\\{\\{${escaped}\\}\\}`, 'g');
    rendered = rendered.replace(regex, value || `[${key}]`);
  }
  rendered = rendered.replace(/\$?\{\{[^}]+\}\}/g, '');
  return rendered;
}

/* ========================================================================== */
/*  HTML → structured blocks for PDF/DOCX rendering                            */
/* ========================================================================== */

type CellAlign = 'left' | 'center' | 'right';

interface ParsedCell {
  text: string;
  bold: boolean;
  align: CellAlign;
  bgColor: string | null;   // e.g. '#ffeeee'
  borderColor: string | null; // e.g. '#cccccc'
  colspan: number;
  rowspan: number;
}

interface ParsedTable {
  type: 'table';
  rows: ParsedCell[][];
  borderColor: string | null; // table-level border override
}

interface ParsedBlock {
  type: 'text';
  text: string;
  isHeading: boolean;
  isBold: boolean;
  isItalic: boolean;
  isSignature: boolean;
}

type ContentBlock = ParsedBlock | ParsedTable;

/** Strip HTML tags and decode entities */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '  - ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&iacute;/g, 'í')
    .replace(/&eacute;/g, 'é')
    .replace(/&aacute;/g, 'á')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿')
    .replace(/&iexcl;/g, '¡')
    .replace(/\u00a0/g, ' ')
    .trim();
}

/** Parse inline style string to extract background-color, text-align, border-color */
function parseStyle(style: string): { bgColor: string | null; align: CellAlign; borderColor: string | null } {
  let bgColor: string | null = null;
  let align: CellAlign = 'left';
  let borderColor: string | null = null;

  const parts = style.split(';');
  for (const part of parts) {
    const [key, val] = part.split(':').map(s => s.trim().toLowerCase());
    if (!key || !val) continue;
    if (key === 'background-color' || key === 'background') {
      bgColor = val;
    } else if (key === 'text-align') {
      if (val === 'center') align = 'center';
      else if (val === 'right') align = 'right';
      else if (val === 'justify') align = 'left';
    } else if (key === 'border-color') {
      borderColor = val;
    }
  }
  return { bgColor, align, borderColor };
}

/** Parse HTML content into structured blocks */
function parseHTMLContent(html: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  // Check if content has HTML tables
  const hasTables = /<table[\s>]/i.test(html);

  if (!hasTables) {
    // Legacy plain-text mode
    const lines = html.split('\n');
    for (const line of lines) {
      const text = stripHtml(line).trim();
      if (!text) {
        blocks.push({ type: 'text', text: '', isHeading: false, isBold: false, isItalic: false, isSignature: false });
        continue;
      }
      const isHeading = /^(CONTRATO|PODER|DEMANDA|DERECHO|ACTA|ESCRITURA|CARTA|CLÁUSULA|ARTÍCULO|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|I\\.|II\\.|III\\.|IV\\.|V\\.|VI\\.|VII\\.|VIII\\.|IX\\.|X\\.|ANEXOS|PARA CONSTANCIA|Del señor)/i.test(text);
      const isSignature = /^[\s_\-]+$/.test(text) || /^________________/.test(text);
      blocks.push({ type: 'text', text, isHeading, isBold: false, isItalic: false, isSignature });
    }
    return blocks;
  }

  // HTML mode: split by top-level blocks (tables vs everything else)
  // Strategy: find all <table>...</table> blocks, treat rest as text paragraphs
  const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tableRegex.exec(html)) !== null) {
    // Text before this table
    const before = html.slice(lastIndex, match.index);
    if (before.trim()) {
      parseTextBlocks(before, blocks);
    }
    // Parse the table
    const table = parseTableHTML(match[0]);
    if (table) blocks.push(table);
    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last table
  const after = html.slice(lastIndex);
  if (after.trim()) {
    parseTextBlocks(after, blocks);
  }

  return blocks;
}

/** Parse non-table HTML into text blocks */
function parseTextBlocks(html: string, blocks: ContentBlock[]) {
  // Split by block-level elements
  const parts = html.split(/<\/(p|h[1-6]|div|blockquote|li)>/i);
  for (const part of parts) {
    // Check for headings
    const hMatch = part.match(/<h([1-3])[^>]*>([\s\S]*?)<\/h[1-3]>/i);
    if (hMatch) {
      const text = stripHtml(hMatch[2]).trim();
      if (text) {
        blocks.push({ type: 'text', text, isHeading: true, isBold: true, isItalic: false, isSignature: false });
      }
      continue;
    }
    // Check for bold/italic paragraphs
    const isBoldWrap = /<(strong|b)[^>]*>/i.test(part);
    const isItalicWrap = /<(em|i)[^>]*>/i.test(part);
    const text = stripHtml(part).trim();
    if (!text) continue;
    const isHeading = /^(CONTRATO|PODER|DEMANDA|DERECHO|ACTA|ESCRITURA|CARTA|CLÁUSULA|ARTÍCULO|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|I\\.|II\\.|III\\.|IV\\.|V\\.|VI\\.|VII\\.|VIII\\.|IX\\.|X\\.|ANEXOS|PARA CONSTANCIA|Del señor)/i.test(text);
    const isSignature = /^[\s_\-]+$/.test(text) || /^________________/.test(text);
    blocks.push({ type: 'text', text, isHeading, isBold: isBoldWrap || isHeading, isItalic: isItalicWrap, isSignature });
  }
}

/** Parse an HTML table into a ParsedTable */
function parseTableHTML(tableHtml: string): ParsedTable | null {
  // Extract table-level border-color from style
  const tableStyleMatch = tableHtml.match(/<table[^>]*style=["']([^"']+)["'][^>]*>/i)
    let tableBorderColor: string | null = null;
  if (tableStyleMatch) {
    const parsed = parseStyle(tableStyleMatch[1]);
    tableBorderColor = parsed.borderColor;
  }

  // Extract rows
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  const rows: ParsedCell[][] = [];
  let rowMatch: RegExpExecArray | null;

  while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
    const rowContent = rowMatch[1];
    const cells: ParsedCell[] = [];

    // Match both <th> and <td>
    const cellRegex = /<(th|td)([^>]*)>([\s\S]*?)<\/(th|td)>/gi;
    let cellMatch: RegExpExecArray | null;

    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
    // Skip if this looks like a nested table's cell (simplified check)
      const tag = cellMatch[1].toLowerCase();
      const attrs = cellMatch[2];
      const innerHtml = cellMatch[3];

      // Parse attributes
      const colspanMatch = attrs.match(/colspan=["']?(\d+)["']?/i);
      const rowspanMatch = attrs.match(/rowspan=["']?(\d+)["']?/i);
      const styleMatch = attrs.match(/style=["']([^"']+)["']/i);

      const { bgColor, align, borderColor } = styleMatch ? parseStyle(styleMatch[1]) : { bgColor: null, align: 'left' as CellAlign, borderColor: null };

      const text = stripHtml(innerHtml).trim();

      cells.push({
        text,
        bold: tag === 'th',
        align,
        bgColor,
        borderColor: borderColor || tableBorderColor,
        colspan: colspanMatch ? parseInt(colspanMatch[1]) : 1,
        rowspan: rowspanMatch ? parseInt(rowspanMatch[1]) : 1,
      });
    }

    if (cells.length > 0) rows.push(cells);
  }

  if (rows.length === 0) return null;
  return { type: 'table', rows, borderColor: tableBorderColor };
}

/** Convert hex color string to pdf-lib rgb */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16) / 255;
    const g = parseInt(cleaned[1] + cleaned[1], 16) / 255;
    const b = parseInt(cleaned[2] + cleaned[2], 16) / 255;
    return { r, g, b };
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16) / 255;
    const g = parseInt(cleaned.slice(2, 4), 16) / 255;
    const b = parseInt(cleaned.slice(4, 6), 16) / 255;
    return { r, g, b };
  }
  // Handle rgb(r,g,b) format
  const rgbMatch = hex.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) {
    return { r: parseInt(rgbMatch[1]) / 255, g: parseInt(rgbMatch[2]) / 255, b: parseInt(rgbMatch[3]) / 255 };
  }
  return null;
}

/** Convert hex/rgb to DOCX hex color (6-char) */
function toDocxColor(color: string | null, fallback: string): string {
  if (!color) return fallback;
  const c = hexToRgb(color);
  if (!c) return fallback;
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
}

/* ========================================================================== */
/*  API Route                                                                */
/* ========================================================================== */

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id');
  const adminSecret = request.headers.get('x-admin-export');

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const format = searchParams.get('format');

  if (!id || !format) {
    return NextResponse.json({ error: 'ID y formato requeridos' }, { status: 400 });
  }

  if (format !== 'pdf' && format !== 'docx') {
    return NextResponse.json({ error: 'Formato no soportado. Use pdf o docx.' }, { status: 400 });
  }

  try {
    let doc;
    if (adminSecret === (process.env.ADMIN_SECRET || 'copyexpress-admin-export')) {
      doc = await db.userDocument.findFirst({
        where: { id },
        include: { template: true },
      });
    } else {
      if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
      doc = await db.userDocument.findFirst({
        where: { id, userId },
        include: { template: true },
      });
    }

    if (!doc) {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }

    const answers: Record<string, string> =
      typeof doc.answers === 'string' ? JSON.parse(doc.answers) : (doc.answers as Record<string, string>) || {};

    let content: string;
    if (doc.template?.baseContent && Object.keys(answers).length > 0) {
      content = renderContent(doc.template.baseContent, answers);
    } else if (doc.generatedContent && doc.generatedContent.length > 100) {
      content = doc.generatedContent;
    } else {
      content = `Documento: ${doc.title}\n\n[No se encontró contenido para exportar. El documento puede estar incompleto.]`;
    }

    const headerContent = doc.template?.headerContent || null;
    const footerContent = doc.template?.footerContent || null;

    if (format === 'pdf') {
      return await generatePDF(content, doc.title, headerContent, footerContent);
    } else {
      return await generateDOCX(content, doc.title, headerContent, footerContent);
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Error al exportar documento' }, { status: 500 });
  }
}

/* ========================================================================== */
/*  PDF Generation with HTML Table Support                                     */
/* ========================================================================== */

async function generatePDF(content: string, title: string, headerContent: string | null, footerContent: string | null): Promise<NextResponse> {
  const pdfDoc = await PDFDocument.create();

  let font: Awaited<ReturnType<typeof pdfDoc.embedFont>>;
  let fontBold: Awaited<ReturnType<typeof pdfDoc.embedFont>>;

  const FONT_REG = process.env.FONT_REGULAR || '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf';
  const FONT_BLD = process.env.FONT_BOLD || '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf';

  try {
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = readFileSync(FONT_REG);
    const fontBoldBytes = readFileSync(FONT_BLD);
    font = await pdfDoc.embedFont(fontBytes);
    fontBold = await pdfDoc.embedFont(fontBoldBytes);
  } catch {
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = { top: 72, bottom: 60, left: 72, right: 72 };
  const usableWidth = pageWidth - margin.left - margin.right;
  const fontSize = 10;
  const lineHeight = fontSize * 1.5;

  const blocks = parseHTMLContent(content);
  const colorDark = rgb(0.04, 0.09, 0.16);
  const colorText = rgb(0.13, 0.13, 0.13);
  const colorMuted = rgb(0.2, 0.2, 0.2);
  const colorGold = rgb(0.16, 0.65, 0.27);
  const colorFooter = rgb(0.6, 0.6, 0.6);
  const defaultBorderColor = rgb(0.75, 0.75, 0.75);
  const defaultHeaderBg = rgb(0.94, 0.94, 0.94);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin.top;
  let pageNum = 1;
  const pageStarts: { page: typeof page; num: number }[] = [{ page, num: 1 }];

  function newPage() {
    pageNum++;
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    pageStarts.push({ page, num: pageNum });
    y = pageHeight - margin.top;
  }

  function ensureSpace(needed: number) {
    if (y - needed < margin.bottom) newPage();
  }

  function drawText(text: string, f: typeof font, size: number, color: typeof colorDark, x: number, maxWidth?: number) {
    if (!maxWidth) maxWidth = usableWidth;
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = f.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        ensureSpace(lineHeight);
        page.drawText(currentLine, { x, y, size, font: f, color });
        y -= lineHeight;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ensureSpace(lineHeight);
      page.drawText(currentLine, { x, y, size, font: f, color });
      y -= lineHeight;
    }
  }

  function drawAlignedText(text: string, f: typeof font, size: number, color: typeof colorDark, align: CellAlign, cellX: number, cellWidth: number, yPos: number) {
    const textWidth = f.widthOfTextAtSize(text, size);
    let x = cellX + 4; // default left padding
    if (align === 'center') x = cellX + (cellWidth - textWidth) / 2;
    else if (align === 'right') x = cellX + cellWidth - textWidth - 4;
    if (x < cellX + 2) x = cellX + 2;
    page.drawText(text, { x, y: yPos, size, font: f, color });
  }

  // ---- Header ----
  const headerImgData = decodeMediaImage(headerContent);
  if (headerImgData) {
    try {
      if (headerImgData.mimeType === 'image/png') {
        var headerImg = await pdfDoc.embedPng(headerImgData.buffer);
      } else if (headerImgData.mimeType === 'image/jpeg' || headerImgData.mimeType === 'image/jpg') {
        var headerImg = await pdfDoc.embedJpg(headerImgData.buffer);
      }
      if (headerImg) {
        const dims = headerImg.scale(1);
        let imgW = dims.width;
        let imgH = dims.height;
        const scale = pageWidth / imgW;
        imgW = pageWidth;
        imgH *= scale;
        page.drawImage(headerImg, { x: 0, y: pageHeight - imgH, width: imgW, height: imgH });
        y = pageHeight - imgH - 8;
      }
    } catch (e) {
      console.warn('Failed to embed header image:', e);
    }
  } else {
    const headerTxt = isMediaText(headerContent);
    if (headerTxt) {
      drawText(headerTxt, font, 8, colorMuted, margin.left);
      y -= 4;
    }
  }

  // Title
  const titleWidth = fontBold.widthOfTextAtSize(title.toUpperCase(), 16);
  const titleX = margin.left + (usableWidth - titleWidth) / 2;
  page.drawText(title.toUpperCase(), { x: titleX > margin.left ? titleX : margin.left, y, size: 16, font: fontBold, color: colorDark });
  y -= lineHeight * 2;

  page.drawLine({
    start: { x: margin.left, y: y + 4 },
    end: { x: pageWidth - margin.right, y: y + 4 },
    thickness: 1.5,
    color: colorGold,
  });
  y -= lineHeight;

  // ---- Body: render blocks ----
  for (const block of blocks) {
    if (block.type === 'text') {
      const { text, isHeading, isBold, isSignature } = block;
      if (!text) {
        y -= lineHeight * 0.5;
        continue;
      }
      if (isSignature) {
        drawText(text, font, fontSize, colorMuted, margin.left);
        continue;
      }
      if (isHeading) {
        y -= lineHeight * 0.3;
        drawText(text, isBold ? fontBold : font, 11, colorDark, margin.left);
        y -= lineHeight * 0.2;
      } else {
        const f = isBold ? fontBold : font;
        drawText(text, f, fontSize, colorText, margin.left);
        y -= 2;
      }
    } else if (block.type === 'table') {
      // Render table as PDF — draw backgrounds first, then grid lines (no gaps)
      const { rows } = block;
      if (rows.length === 0) continue;

      const numCols = Math.max(...rows.map(r => r.reduce((sum, c) => sum + c.colspan, 0)));
      const colWidth = usableWidth / numCols;
      const cellPadding = 4;
      const cellLineHeight = fontSize * 1.4;
      const rowHeaderHeight = cellLineHeight + cellPadding * 2;

      // Pre-calculate row heights
      const rowHeights: number[] = [];
      for (let ri = 0; ri < rows.length; ri++) {
        const row = rows[ri];
        let maxCellHeight = rowHeaderHeight;
        for (const cell of row) {
          const f = cell.bold ? fontBold : font;
          const words = cell.text.split(' ');
          let lines = 1;
          let currentLine = '';
          const availableWidth = colWidth * cell.colspan - cellPadding * 2;
          for (const word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            if (f.widthOfTextAtSize(testLine, fontSize) > availableWidth && currentLine) {
              lines++;
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          const cellHeight = lines * cellLineHeight + cellPadding * 2;
          if (cellHeight > maxCellHeight) maxCellHeight = cellHeight;
        }
        rowHeights.push(maxCellHeight);
      }

      for (let ri = 0; ri < rows.length; ri++) {
        const row = rows[ri];
        const maxCellHeight = rowHeights[ri];

        // Check page break
        if (y - maxCellHeight < margin.bottom) newPage();

        const cellTop = y;
        const cellBottom = y - maxCellHeight;
        let colIndex = 0;

        // Pass 1: Draw cell backgrounds only (no borders)
        for (let ci = 0; ci < row.length; ci++) {
          const cell = row[ci];
          const cellX = margin.left + colIndex * colWidth;
          const cellW = colWidth * cell.colspan;
          const bgC = cell.bgColor ? hexToRgb(cell.bgColor) : null;
          const headerBg = bgC ? rgb(bgC.r, bgC.g, bgC.b) : (cell.bold ? defaultHeaderBg : null);
          if (headerBg) {
            page.drawRectangle({
              x: cellX, y: cellBottom, width: cellW, height: maxCellHeight,
              color: headerBg,
            });
          }
          colIndex += cell.colspan;
        }

        // Pass 2: Draw grid lines (individual line segments — no gaps between cells)
        colIndex = 0;
        for (let ci = 0; ci < row.length; ci++) {
          const cell = row[ci];
          const cellX = margin.left + colIndex * colWidth;
          const cellW = colWidth * cell.colspan;
          const borderC = cell.borderColor ? hexToRgb(cell.borderColor) : null;
          const lineColor = borderC ? rgb(borderC.r, borderC.g, borderC.b) : defaultBorderColor;
          const bw = 0.75;

          // Top line
          page.drawLine({ start: { x: cellX, y: cellTop }, end: { x: cellX + cellW, y: cellTop }, thickness: bw, color: lineColor });
          // Bottom line
          page.drawLine({ start: { x: cellX, y: cellBottom }, end: { x: cellX + cellW, y: cellBottom }, thickness: bw, color: lineColor });
          // Left line
          page.drawLine({ start: { x: cellX, y: cellTop }, end: { x: cellX, y: cellBottom }, thickness: bw, color: lineColor });
          // Right line
          page.drawLine({ start: { x: cellX + cellW, y: cellTop }, end: { x: cellX + cellW, y: cellBottom }, thickness: bw, color: lineColor });

          colIndex += cell.colspan;
        }

        // Pass 3: Draw cell text
        colIndex = 0;
        for (let ci = 0; ci < row.length; ci++) {
          const cell = row[ci];
          const cellX = margin.left + colIndex * colWidth;
          const cellW = colWidth * cell.colspan;
          if (cell.text) {
            const f = cell.bold ? fontBold : font;
            const textY = cellTop - cellPadding - fontSize;
            const words = cell.text.split(' ');
            let currentLine = '';
            let lineY = textY;
            const availableWidth = cellW - cellPadding * 2;
            for (const word of words) {
              const testLine = currentLine ? currentLine + ' ' + word : word;
              const testWidth = f.widthOfTextAtSize(testLine, fontSize);
              if (testWidth > availableWidth && currentLine) {
                drawAlignedText(currentLine, f, fontSize, colorText, cell.align, cellX, cellW, lineY);
                lineY -= cellLineHeight;
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            }
            if (currentLine) {
              const textWidth = f.widthOfTextAtSize(currentLine, fontSize);
              let tx = cellX + cellPadding;
              if (cell.align === 'center') tx = cellX + (cellW - textWidth) / 2;
              else if (cell.align === 'right') tx = cellX + cellW - textWidth - cellPadding;
              page.drawText(currentLine, { x: tx, y: lineY, size: fontSize, font: f, color: colorText });
            }
          }
          colIndex += cell.colspan;
        }

        // Rows must be contiguous: the next row's top border sits exactly on
        // this row's bottom border. Any extra offset here renders as a white
        // gap between rows, making cells look detached in the PDF.
        y = cellBottom;
      }

      y -= 4; // space after table
    }
  }

  // ---- Footers ----
  const footerImgData = decodeMediaImage(footerContent);
  let footerImgEmbedded: Awaited<ReturnType<typeof pdfDoc.embedPng>> | null = null;
  let footerImgW = 0;
  let footerImgH = 0;
  if (footerImgData) {
    try {
      if (footerImgData.mimeType === 'image/png') {
        footerImgEmbedded = await pdfDoc.embedPng(footerImgData.buffer);
      } else if (footerImgData.mimeType === 'image/jpeg' || footerImgData.mimeType === 'image/jpg') {
        footerImgEmbedded = await pdfDoc.embedJpg(footerImgData.buffer);
      }
      if (footerImgEmbedded) {
        const dims = footerImgEmbedded.scale(1);
        let imgW = dims.width;
        let imgH = dims.height;
        const scale = pageWidth / imgW;
        imgW = pageWidth;
        imgH *= scale;
        footerImgW = imgW;
        footerImgH = imgH;
      }
    } catch (e) {
      console.warn('Failed to embed footer image:', e);
    }
  }

  const footerTxt = isMediaText(footerContent);

  for (const { page: p, num } of pageStarts) {
    if (footerImgEmbedded) {
      p.drawImage(footerImgEmbedded, { x: 0, y: 0, width: footerImgW, height: footerImgH });
    } else if (footerTxt) {
      const fw = font.widthOfTextAtSize(footerTxt, 7);
      const fx = margin.left + (usableWidth - fw) / 2;
      p.drawText(footerTxt, {
        x: fx > margin.left ? fx : margin.left,
        y: margin.bottom - 10,
        size: 7,
        font,
        color: colorFooter,
      });
    }
    const hasCustomFooter = footerImgEmbedded || footerTxt;
    const pnText = hasCustomFooter
      ? `Pagina ${num} de ${pageNum}`
      : `Generado por CopyDocs · Pagina ${num} de ${pageNum}`;
    const pnW = font.widthOfTextAtSize(pnText, 7);
    const pnX = margin.left + (usableWidth - pnW) / 2;
    p.drawText(pnText, {
      x: pnX > margin.left ? pnX : margin.left,
      y: footerImgEmbedded ? footerImgH + 4 : margin.bottom - 22,
      size: 7,
      font,
      color: colorFooter,
    });
  }

  pdfDoc.setTitle(title);
  pdfDoc.setAuthor('CopyDocs - Generacion Inteligente de Documentos');
  pdfDoc.setSubject('Documento Legal Colombiano');
  pdfDoc.setCreator('CopyDocs');

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(title)}.pdf"`,
      'Content-Length': pdfBytes.length.toString(),
    },
  });
}

/* ========================================================================== */
/*  DOCX Generation with HTML Table Support                                    */
/* ========================================================================== */

async function generateDOCX(content: string, title: string, headerContent: string | null, footerContent: string | null): Promise<NextResponse> {
  const blocks = parseHTMLContent(content);

  const children: (Paragraph | DocxTable)[] = [
    // Header
    (() => {
      const imgData = decodeMediaImage(headerContent);
      if (imgData) {
        return new Paragraph({
          children: [new ImageRun({ data: imgData.buffer, transformation: { width: imgData.width || 468, height: imgData.height || 60 } })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        });
      }
      const txt = isMediaText(headerContent);
      if (txt) {
        return new Paragraph({
          children: [new TextRun({ text: txt, size: 18, color: '999999', font: 'Times New Roman' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        });
      }
      return new Paragraph({ children: [], spacing: { after: 200 } });
    })(),

    new Paragraph({
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 32, color: '0A1628', font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '________________________________________', color: '28A745', size: 16, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  ];

  for (const block of blocks) {
    if (block.type === 'table') {
      // Convert to DOCX table
      const docxRows: DocxTableRow[] = block.rows.map(row =>
        new DocxTableRow({
          children: row.map(cell => {
            const bgColor = toDocxColor(cell.bgColor, cell.bold ? 'F0F0F0' : 'FFFFFF');
            const borderColor = toDocxColor(cell.borderColor, 'BBBBBB');
            const align = cell.align === 'center' ? AlignmentType.CENTER
              : cell.align === 'right' ? AlignmentType.RIGHT
              : AlignmentType.LEFT;
            return new DocxTableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({
                    text: cell.text,
                    bold: cell.bold,
                    size: 20,
                    color: '222222',
                    font: 'Times New Roman',
                  })],
                  alignment: align,
                  spacing: { before: 40, after: 40 },
                }),
              ],
              width: { size: Math.floor(9000 / Math.max(...block.rows.map(r => r.length))), type: WidthType.DXA },
              columnSpan: cell.colspan > 1 ? cell.colspan : undefined,
              shading: { type: 'clear', fill: bgColor },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
                left: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
                right: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
              },
            });
          }),
        })
      );
      if (docxRows.length > 0) {
        children.push(new DocxTable({ rows: docxRows, width: { size: 9000, type: WidthType.DXA } }));
        children.push(new Paragraph({ children: [], spacing: { after: 200 } }));
      }
    } else {
      const { text, isHeading, isBold, isSignature } = block;
      if (!text) {
        children.push(new Paragraph({ children: [], spacing: { after: 100 } }));
        continue;
      }
      if (isHeading) {
        children.push(new Paragraph({
          children: [new TextRun({ text, bold: true, size: 22, color: '0A1628', font: 'Times New Roman' })],
          heading: /^(CLÁSULA|ARTÍCULO)/i.test(text) ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }));
      } else if (isSignature) {
        children.push(new Paragraph({
          children: [new TextRun({ text, size: 20, color: '333333', font: 'Times New Roman' })],
          spacing: { after: 80 },
        }));
      } else {
        children.push(new Paragraph({
          children: [new TextRun({
            text,
            bold: isBold,
            italics: block.isItalic,
            size: 22,
            color: '222222',
            font: 'Times New Roman',
          })],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 80, line: 276 },
        }));
      }
    }
  }

  // Footer
  const footerImgData = decodeMediaImage(footerContent);
  if (footerImgData) {
    children.push(new Paragraph({
      children: [new ImageRun({ data: footerImgData.buffer, transformation: { width: footerImgData.width || 468, height: footerImgData.height || 40 } })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
    }));
  } else {
    const footerTxt = isMediaText(footerContent);
    if (footerTxt) {
      children.push(new Paragraph({
        children: [new TextRun({ text: footerTxt, size: 16, color: '999999', font: 'Times New Roman', italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      }));
    } else {
      children.push(new Paragraph({
        children: [new TextRun({
          text: 'Generado por CopyDocs - Generacion Inteligente de Documentos',
          size: 14,
          color: '999999',
          font: 'Times New Roman',
          italics: true,
        })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      }));
    }
  }

  const docx = new DocxDocument({
    sections: [{
      properties: {
        page: { margin: { top: 1200, right: 1300, bottom: 1200, left: 1300 } },
      },
      children,
    }],
  });

  const buffer = await Packer.toBuffer(docx);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(title)}.docx"`,
      'Content-Length': buffer.length.toString(),
    },
  });
}
