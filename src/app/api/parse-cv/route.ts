import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let rawText = "";

  if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value;
  } else if (file.name.endsWith(".pdf")) {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    rawText = result.text;
  } else {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const lines = rawText.split("\n").map(function trimLine(l) { return l.trim(); }).filter(function notEmpty(l) { return l.length > 0; });

  const emailMatch = rawText.match(/[\w.+-]+@[\w.-]+\.\w{2,}/);
  const phoneMatch = rawText.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}/);
  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[\w-]+/);

  return NextResponse.json({
    name: lines[0] || "",
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0].trim() : "",
    linkedin: linkedinMatch ? "https://" + linkedinMatch[0] : "",
    currentRole: "",
    summary: lines.slice(0, 5).join(" "),
    rawText,
    fileName: file.name,
    uploadedAt: Date.now(),
  });
}
