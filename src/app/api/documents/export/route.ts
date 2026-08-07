import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {
  Document as DocxDocument,
  Paragraph,
  TextRun,
  Packer,
  AlignmentType,
  HeadingLevel,
} from 'docx';
import { readFileSync } from 'fs';

function renderContent(content: string, answers: Record<string, string>): string {
  let rendered = content;
  for (const [key, value] of Object.entries(answers)) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\$\\{\\{${escaped}\\}\\}`, 'g');
    rendered = rendered.replace(regex, value || `[${key}]`);
  }
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
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

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
    const doc = await db.userDocument.findFirst({
      where: { id, userId },
      include: { template: true },
    });

    if (!doc) {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }

    let content: string;
    if (doc.generatedContent) {
      content = doc.generatedContent;
    } else {
      const answers: Record<string, string> =
        typeof doc.answers === 'string' ? JSON.parse(doc.answers) : (doc.answers as Record<string, string>) || {};
      content = renderContent(doc.template?.baseContent || `Documento: ${doc.title}`, answers);
    }

    if (format === 'pdf') {
      return await generatePDF(content, doc.title);
    } else {
      return await generateDOCX(content, doc.title);
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Error al exportar documento' }, { status: 500 });
  }
}

async function generatePDF(content: string, title: string): Promise<NextResponse> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Embed DejaVu Serif for full Unicode/Spanish support
  const fontBytes = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf');
  const fontBoldBytes = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf');
  const font = await pdfDoc.embedFont(fontBytes);
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);

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
  const colorGold = rgb(0.79, 0.66, 0.31);    // #C9A94E
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
  for (const { page: p, num } of pageStarts) {
    const footerText = `Generado por LexDoc · Página ${num} de ${pageNum}`;
    const footerWidth = font.widthOfTextAtSize(footerText, 7);
    const footerX = margin.left + (usableWidth - footerWidth) / 2;
    p.drawText(footerText, {
      x: footerX > margin.left ? footerX : margin.left,
      y: margin.bottom - 10,
      size: 7,
      font,
      color: colorFooter,
    });
  }

  // Set PDF metadata
  pdfDoc.setTitle(title);
  pdfDoc.setAuthor('LexDoc - Generación Inteligente de Documentos Legales');
  pdfDoc.setSubject('Documento Legal Colombiano');
  pdfDoc.setCreator('LexDoc');

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(title)}.pdf"`,
      'Content-Length': pdfBytes.length.toString(),
    },
  });
}

async function generateDOCX(content: string, title: string): Promise<NextResponse> {
  const lines = parseLines(content);

  const paragraphs: Paragraph[] = [
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
          color: 'C9A94E',
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

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Generado por LexDoc - Generación Inteligente de Documentos Legales Colombianos',
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
