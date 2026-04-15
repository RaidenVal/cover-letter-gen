import { NextResponse } from "next/server";
import { createProvider } from "@/lib/llm";
import { analyzeJobDescription } from "@/lib/parsers/jd-analyzer";
import { matchStories } from "@/lib/matcher";
import { generateCoverLetter } from "@/lib/generator";
import type { Story, CVData } from "@/types";
import type { ProviderName } from "@/lib/llm/types";

interface GenerateRequest {
  jobDescription: string;
  stories: Story[];
  cvData: CVData;
  provider: ProviderName;
  apiKey: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;

  if (!body.jobDescription || !body.stories?.length || !body.cvData || !body.apiKey) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const llm = createProvider(body.provider, body.apiKey);

  const jdAnalysis = await analyzeJobDescription(llm, body.jobDescription);

  const matchedStories = await matchStories(llm, jdAnalysis, body.stories);

  if (matchedStories.length === 0) {
    return NextResponse.json(
      { error: "No stories matched the job description. Try adding more stories with relevant skills." },
      { status: 422 }
    );
  }

  const content = await generateCoverLetter(llm, body.cvData, jdAnalysis, matchedStories);

  return NextResponse.json({
    content,
    jdAnalysis,
    matchedStories: matchedStories.map(function serializeMatch(m) {
      return {
        story: m.story,
        relevance: m.relevance,
        matchedSkills: m.matchedSkills,
      };
    }),
  });
}
