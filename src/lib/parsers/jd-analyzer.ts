import type { LLMProvider } from "@/lib/llm/types";
import type { JDAnalysis } from "@/types";

const SYSTEM_PROMPT = `You are a job description analyzer. Extract structured information from job descriptions.

You MUST respond with valid JSON only. No markdown, no explanation, no code fences. Just the JSON object.

The JSON must match this schema:
{
  "companyName": "string",
  "roleTitle": "string",
  "requiredSkills": ["string"],
  "niceToHaveSkills": ["string"],
  "companyValues": ["string"]
}

Rules:
- requiredSkills: technical and soft skills explicitly required
- niceToHaveSkills: skills listed as preferred, bonus, or nice-to-have
- companyValues: cultural values, mission statements, or workplace qualities mentioned
- If a field cannot be determined, use an empty string or empty array`;

export async function analyzeJobDescription(
  llm: LLMProvider,
  rawText: string
): Promise<JDAnalysis> {
  const response = await llm.complete(
    SYSTEM_PROMPT,
    `Analyze this job description:\n\n${rawText}`
  );

  const parsed = JSON.parse(response) as Omit<JDAnalysis, "rawText">;

  return {
    companyName: parsed.companyName || "",
    roleTitle: parsed.roleTitle || "",
    requiredSkills: parsed.requiredSkills || [],
    niceToHaveSkills: parsed.niceToHaveSkills || [],
    companyValues: parsed.companyValues || [],
    rawText,
  };
}
