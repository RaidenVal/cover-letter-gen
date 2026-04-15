"use client";

import type { JDAnalysis } from "@/types";

interface ExportButtonsProps {
  html: string;
  jdAnalysis: JDAnalysis;
}

export default function ExportButtons({ html, jdAnalysis }: ExportButtonsProps) {
  async function handleExportPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const margin = 25.4;
    const pageWidth = 210;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const title = `Cover Letter - ${jdAnalysis.roleTitle}, ${jdAnalysis.companyName}`;
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text(title, pageWidth / 2, y, { align: "center" });
    y += 10;

    const plainText = htmlToPlainText(html);
    const paragraphs = plainText.split("\n\n").filter((p) => p.trim());

    doc.setFontSize(11);
    doc.setFont("times", "normal");

    for (const para of paragraphs) {
      const lines = doc.splitTextToSize(para, contentWidth);
      const blockHeight = lines.length * 5;

      if (y + blockHeight > 297 - margin) break;

      doc.text(lines, margin, y);
      y += blockHeight + 4;
    }

    const filename = jdAnalysis.companyName
      ? `Cover Letter - ${jdAnalysis.roleTitle}, ${jdAnalysis.companyName}.pdf`
      : "Cover Letter.pdf";
    doc.save(filename);
  }

  async function handleExportDocx() {
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const { saveAs } = await import("file-saver");

    const plainText = htmlToPlainText(html);
    const paragraphs = plainText.split("\n\n").filter((p) => p.trim());

    const title = `Cover Letter - ${jdAnalysis.roleTitle}, ${jdAnalysis.companyName}`;
    const headerParagraphs: InstanceType<typeof Paragraph>[] = [
      new Paragraph({
        alignment: "center" as const,
        children: [new TextRun({ text: title, bold: true, size: 28, font: "Times New Roman" })],
        spacing: { after: 200 },
      }),
    ];

    const bodyParagraphs = paragraphs.map(function createParagraph(text) {
      return new Paragraph({
        children: [new TextRun({ text, size: 22, font: "Times New Roman" })],
        spacing: { after: 160, line: 276 },
      });
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [...headerParagraphs, ...bodyParagraphs],
        },
      ],
    });

    const buffer = await Packer.toBlob(doc);
    const filename = jdAnalysis.companyName
      ? `Cover Letter - ${jdAnalysis.roleTitle}, ${jdAnalysis.companyName}.docx`
      : "Cover Letter.docx";
    saveAs(buffer, filename);
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportPdf}
        className="rounded-lg bg-[#e8e6dc] px-4 py-2 text-[15px] font-medium text-[#4d4c48] shadow-[#e8e6dc_0px_0px_0px_0px,#d1cfc5_0px_0px_0px_1px] transition-colors hover:bg-[#dedad0]"
      >
        Export PDF
      </button>
      <button
        onClick={handleExportDocx}
        className="rounded-lg bg-[#e8e6dc] px-4 py-2 text-[15px] font-medium text-[#4d4c48] shadow-[#e8e6dc_0px_0px_0px_0px,#d1cfc5_0px_0px_0px_1px] transition-colors hover:bg-[#dedad0]"
      >
        Export Word
      </button>
    </div>
  );
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}
