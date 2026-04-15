import type { LLMProvider } from "@/lib/llm/types";
import type { Story, JDAnalysis, MatchedStory } from "@/types";

const SYSTEM_PROMPT = `You are a career story matcher. Given a job description analysis and a set of professional stories, select the 2-3 most relevant stories that best demonstrate the candidate's fit for the role.

You MUST respond with valid JSON only. No markdown, no explanation, no code fences. Just the JSON array.

Each element must match:
{
  "storyId": "string",
  "relevance": "string (1-2 sentences explaining why this story is relevant)",
  "matchedSkills": ["string (skills from the JD that this story demonstrates)"]
}

Rules:
- Pick 2-3 stories maximum
- Prioritize stories that match required skills over nice-to-have
- Each story should cover different skills to maximize coverage
- Order by relevance (most relevant first)`;

export async function matchStories(
  llm: LLMProvider,
  jdAnalysis: JDAnalysis,
  stories: Story[]
): Promise<MatchedStory[]> {
  const storySummaries = stories.map(function formatStory(s) {
    return {
      id: s.id,
      title: s.title,
      tags: s.tags,
      situation: s.situation,
      task: s.task,
      action: s.action,
      result: s.result,
    };
  });

  const userPrompt = `Job Description Analysis:
${JSON.stringify(jdAnalysis, null, 2)}

Available Stories:
${JSON.stringify(storySummaries, null, 2)}`;

  const response = await llm.complete(SYSTEM_PROMPT, userPrompt);
  const matches = JSON.parse(response) as Array<{
    storyId: string;
    relevance: string;
    matchedSkills: string[];
  }>;

  const storyMap = new Map(stories.map((s) => [s.id, s]));

  return matches
    .filter((m) => storyMap.has(m.storyId))
    .map(function toMatchedStory(m) {
      return {
        story: storyMap.get(m.storyId)!,
        relevance: m.relevance,
        matchedSkills: m.matchedSkills,
      };
    });
}
