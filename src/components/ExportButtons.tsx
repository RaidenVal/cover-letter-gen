"use client";

import type { CVData, JDAnalysis } from "@/types";

interface ExportButtonsProps {
  html: string;
  cvData: CVData;
  jdAnalysis: JDAnalysis;
}

export default function ExportButtons({ html, cvData, jdAnalysis }: ExportButtonsProps) {
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

    doc.setFont("times", "normal");
    doc.setFontSize(11);

    if (cvData.name) {
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(cvData.name, pageWidth / 2, y, { align: "center" });
      y += 6;
    }

    const contactParts: string[] = [];
    if (cvData.email) contactParts.push(cvData.email);
    if (cvData.phone) contactParts.push(cvData.phone);
    if (cvData.linkedin) contactParts.push(cvData.linkedin);

    if (contactParts.length > 0) {
      doc.setFontSize(9);
      doc.setFont("times", "normal");
      doc.text(contactParts.join("  |  "), pageWidth / 2, y, { align: "center" });
      y += 10;
    }

    const today = new Date();
    doc.setFontSize(11);
    doc.text(
      today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      margin,
      y
    );
    y += 8;

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
      ? `Cover Letter - ${jdAnalysis.companyName}.pdf`
      : "Cover Letter.pdf";
    doc.save(filename);
  }

  async function handleExportDocx() {
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const { saveAs } = await import("file-saver");

    const plainText = htmlToPlainText(html);
    const paragraphs = plainText.split("\n\n").filter((p) => p.trim());

    const headerParagraphs: InstanceType<typeof Paragraph>[] = [];

    if (cvData.name) {
      headerParagraphs.push(
        new Paragraph({
          alignment: "center" as const,
          children: [new TextRun({ text: cvData.name, bold: true, size: 28, font: "Times New Roman" })],
          spacing: { after: 80 },
        })
      );
    }

    const contactParts: string[] = [];
    if (cvData.email) contactParts.push(cvData.email);
    if (cvData.phone) contactParts.push(cvData.phone);
    if (cvData.linkedin) contactParts.push(cvData.linkedin);

    if (contactParts.length > 0) {
      headerParagraphs.push(
        new Paragraph({
          alignment: "center" as const,
          children: [new TextRun({ text: contactParts.join("  |  "), size: 18, font: "Times New Roman" })],
          spacing: { after: 200 },
        })
      );
    }

    const today = new Date();
    headerParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
            size: 22,
            font: "Times New Roman",
          }),
        ],
        spacing: { after: 160 },
      })
    );

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
      ? `Cover Letter - ${jdAnalysis.companyName}.docx`
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
