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
} from 'docx';
import { readFileSync } from 'fs';
import { Buffer } from 'node:buffer';

function isBase64Image(value: string | null | undefined): boolean {
  if (!value) return false
  if (value.startsWith('data:image/')) return true
  // New JSON format: { type: 'image', dataUrl: '...' }
  try {
    const parsed = JSON.parse(value);
    return parsed?.type === 'image' && !!parsed.dataUrl;
  } catch { return false }
}

function decodeMediaImage(value: string): { buffer: Buffer; mimeType: string; width?: number; height?: number } | null {
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
  // Plain text (not image, not json)
  if (!value.startsWith('data:image')) return value;
  return null;
}

function renderContent(content: string, answers: Record<string, string>): string {
  let rendered = content;
  for (const [key, value] of Object.entries(answers)) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match both {{key}} and the escaped ${{key}} variants
    const regex = new RegExp(`\\$?\\{\\{${escaped}\\}\\}`, 'g');
    rendered = rendered.replace(regex, value || `[${key}]`);
  }
  // Clean any remaining unresolved placeholders
  rendered = rendered.replace(/\$?\{\{[^}]+\}\}/g, '');
  return rendered;
}

function parseLines(text: string): { text: string; isHeading: boolean; isSignature: boolean }[] {
  const lines = text.split('\n');
  return lines.map((line) => {
    const trimmed = line.trim();
    const isHeading = /^(CONTRATO|PODER|DEMANDA|DERECHO|ACTA|ESCRITURA|CARTA|CLÁUSULA|ARTÍCULO|PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SÉPTIMA|OCTAVA|NOVENA|DÉCIMA|I\\.|II\\.|III\\.|IV\\.|V\\.|VI\\.|VII\\.|VIII\\.|IX\\.|X\\.|ANEXOS|PARA CONSTANCIA|Del señor)/i.test(trimmed);
    const isSignature = /^[\s_\-]+$/.test(trimmed) || /^________________/.test(trimmed);
    return { text: trimmed, isHeading, isSignature };
  });
}

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
    // Allow export for admin or for the document owner
    let doc;
    if (adminSecret === 'copyexpress-admin-export') {
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

    // Always render from template + answers (authoritative source of truth).
    // generatedContent may be a stale placeholder — ignore it.
    const answers: Record<string, string> =
      typeof doc.answers === 'string' ? JSON.parse(doc.answers) : (doc.answers as Record<string, string>) || {};

    let content: string;
    if (doc.template?.baseContent && Object.keys(answers).length > 0) {
      content = renderContent(doc.template.baseContent, answers);
    } else if (doc.generatedContent && doc.generatedContent.length > 100) {
      // Only trust generatedContent if it's substantial (real content, not placeholder)
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

async function generatePDF(content: string, title: string, headerContent: string | null, footerContent: string | null): Promise<NextResponse> {
  const pdfDoc = await PDFDocument.create();

  let font: Awaited<ReturnType<typeof pdfDoc.embedFont>>;
  let fontBold: Awaited<ReturnType<typeof pdfDoc.embedFont>>;

  try {
    // Try system fonts (DejaVu Serif) for full Unicode/Spanish support
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf');
    const fontBoldBytes = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf');
    font = await pdfDoc.embedFont(fontBytes);
    fontBold = await pdfDoc.embedFont(fontBoldBytes);
  } catch {
    // Fallback to built-in standard fonts (work in any environment)
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  const pageWidth = 612; // Letter
  const pageHeight = 792;
  const margin = { top: 72, bottom: 60, left: 72, right: 72 };
  const usableWidth = pageWidth - margin.left - margin.right;
  const fontSize = 10;
  const lineHeight = fontSize * 1.5;

  const lines = parseLines(content);
  const colorDark = rgb(0.04, 0.09, 0.16);  // #0A1628
  const colorText = rgb(0.13, 0.13, 0.13);    // #222222
  const colorMuted = rgb(0.2, 0.2, 0.2);      // #333333
  const colorGold = rgb(0.16, 0.65, 0.27);    // #28A745
  const colorFooter = rgb(0.6, 0.6, 0.6);     // #999999

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

  function drawText(text: string, f: typeof font, size: number, color: typeof colorDark, x: number, maxWidth?: number) {
    if (y < margin.bottom + lineHeight) newPage();
    if (!maxWidth) maxWidth = usableWidth;

    // Simple word wrap
    const words = text.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = f.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && currentLine) {
        page.drawText(currentLine, { x, y, size, font: f, color });
        y -= lineHeight;
        if (y < margin.bottom + lineHeight) { newPage(); }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, { x, y, size, font: f, color });
      y -= lineHeight;
    }
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
        // Use admin-specified dimensions as reference, scale proportionally to fit
        const targetW = headerImgData.width || 468;
        const targetH = headerImgData.height || 60;
        const scale = Math.min(usableWidth / imgW, targetH / imgH, 1);
        imgW *= scale;
        imgH *= scale;
        const imgX = margin.left + (usableWidth - imgW) / 2;
        page.drawImage(headerImg, { x: imgX, y: y - imgH, width: imgW, height: imgH });
        y -= imgH + 8;
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
  if (titleX > margin.left) {
    page.drawText(title.toUpperCase(), { x: titleX, y, size: 16, font: fontBold, color: colorDark });
  } else {
    page.drawText(title.toUpperCase(), { x: margin.left, y, size: 16, font: fontBold, color: colorDark });
  }
  y -= lineHeight * 2;

  // Gold separator line
  page.drawLine({
    start: { x: margin.left, y: y + 4 },
    end: { x: pageWidth - margin.right, y: y + 4 },
    thickness: 1.5,
    color: colorGold,
  });
  y -= lineHeight;

  // Body
  for (const { text, isHeading, isSignature } of lines) {
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
      drawText(text, fontBold, 11, colorDark, margin.left);
      y -= lineHeight * 0.2;
    } else {
      drawText(text, font, fontSize, colorText, margin.left);
      y -= 2;
    }
  }

  // Add footers to all pages
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
        const targetH = footerImgData.height || 40;
        const scale = Math.min(usableWidth / imgW, targetH / imgH, 1);
        footerImgW = imgW * scale;
        footerImgH = imgH * scale;
      }
    } catch (e) {
      console.warn('Failed to embed footer image:', e);
    }
  }

  const footerTxt = isMediaText(footerContent);

  for (const { page: p, num } of pageStarts) {
    if (footerImgEmbedded) {
      const imgX = margin.left + (usableWidth - footerImgW) / 2;
      p.drawImage(footerImgEmbedded, { x: imgX, y: margin.bottom - 20 - footerImgH, width: footerImgW, height: footerImgH });
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
    // Page number
    const hasCustomFooter = footerImgEmbedded || footerTxt;
    const pnText = hasCustomFooter
      ? `Página ${num} de ${pageNum}`
      : `Generado por CopyExpress · Página ${num} de ${pageNum}`;
    const pnW = font.widthOfTextAtSize(pnText, 7);
    const pnX = margin.left + (usableWidth - pnW) / 2;
    p.drawText(pnText, {
      x: pnX > margin.left ? pnX : margin.left,
      y: margin.bottom - 22 - (footerImgEmbedded ? footerImgH : 0),
      size: 7,
      font,
      color: colorFooter,
    });
  }

  // Set PDF metadata
  pdfDoc.setTitle(title);
  pdfDoc.setAuthor('CopyExpress - Generación Inteligente de Documentos');
  pdfDoc.setSubject('Documento Legal Colombiano');
  pdfDoc.setCreator('CopyExpress');

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

async function generateDOCX(content: string, title: string, headerContent: string | null, footerContent: string | null): Promise<NextResponse> {
  const lines = parseLines(content);

  const paragraphs: Paragraph[] = [
    // Header
    (() => {
      const imgData = decodeMediaImage(headerContent);
      if (imgData) {
        return new Paragraph({
          children: [new ImageRun({ data: imgData.buffer, transformation: { width: imgData.width || 468, height: imgData.height || 60 } })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      }
      const txt = isMediaText(headerContent);
      if (txt) {
        return new Paragraph({
          children: [new TextRun({ text: txt, size: 18, color: '999999', font: 'Times New Roman' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      }
      return null
    })()!,

    new Paragraph({
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 32,
          color: '0A1628',
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '________________________________________',
          color: '28A745',
          size: 16,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  ];

  for (const { text, isHeading, isSignature } of lines) {
    if (!text) {
      paragraphs.push(new Paragraph({ children: [], spacing: { after: 100 } }));
      continue;
    }

    if (isHeading) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
              size: 22,
              color: '0A1628',
              font: 'Times New Roman',
            }),
          ],
          heading: /^(CLÁUSULA|ARTÍCULO)/i.test(text) ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (isSignature) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text,
              size: 20,
              color: '333333',
              font: 'Times New Roman',
            }),
          ],
          spacing: { after: 80 },
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text,
              size: 22,
              color: '222222',
              font: 'Times New Roman',
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 80, line: 276 },
        })
      );
    }
  }

  // Footer
  const footerImgData = decodeMediaImage(footerContent);
  if (footerImgData) {
    paragraphs.push(
      new Paragraph({
        children: [new ImageRun({ data: footerImgData.buffer, transformation: { width: footerImgData.width || 468, height: footerImgData.height || 40 } })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      })
    );
  } else {
    const footerTxt = isMediaText(footerContent);
    if (footerTxt) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: footerTxt, size: 16, color: '999999', font: 'Times New Roman', italics: true })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Generado por CopyExpress - Generación Inteligente de Documentos',
              size: 14,
              color: '999999',
              font: 'Times New Roman',
              italics: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        })
      );
    }
  }

  const docx = new DocxDocument({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, right: 1300, bottom: 1200, left: 1300 },
          },
        },
        children: paragraphs,
      },
    ],
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
