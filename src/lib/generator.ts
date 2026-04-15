import type { LLMProvider } from "@/lib/llm/types";
import type { CVData, JDAnalysis, MatchedStory } from "@/types";

const SYSTEM_PROMPT = `You are a professional cover letter writer. Write a tailored, compelling cover letter using the candidate's real experiences.

Rules:
- Write 350-400 words (must fit one page when formatted)
- Use a professional but warm tone
- Opening paragraph: express enthusiasm for the specific role and company
- Body paragraphs (2-3): weave in the matched stories naturally, connecting the candidate's experience to the job requirements. Do NOT use STAR format headers. Tell the stories as flowing narrative that demonstrates skills
- Closing paragraph: reiterate fit and express interest in discussing further
- Do NOT include the header (name, address, date). Just the letter body starting with "Dear Hiring Manager,"
- Do NOT include placeholders like [Company Name]. Use the actual company and role names provided
- Write in first person
- Be specific about achievements and results from the stories
- Return only the letter text, no markdown formatting or code fences`;

export async function generateCoverLetter(
  llm: LLMProvider,
  cvData: CVData,
  jdAnalysis: JDAnalysis,
  matchedStories: MatchedStory[]
): Promise<string> {
  const storiesContext = matchedStories
    .map(function formatMatch(m) {
      return `Story: ${m.story.title}
Relevance: ${m.relevance}
Matched Skills: ${m.matchedSkills.join(", ")}
Situation: ${m.story.situation}
Task: ${m.story.task}
Action: ${m.story.action}
Result: ${m.story.result}`;
    })
    .join("\n\n---\n\n");

  const userPrompt = `Candidate CV (full text):
${cvData.rawText}

Target Role: ${jdAnalysis.roleTitle} at ${jdAnalysis.companyName}
Required Skills: ${jdAnalysis.requiredSkills.join(", ")}
Nice-to-Have Skills: ${jdAnalysis.niceToHaveSkills.join(", ")}
Company Values: ${jdAnalysis.companyValues.join(", ")}

Matched Stories to Incorporate:
${storiesContext}`;

  return llm.complete(SYSTEM_PROMPT, userPrompt);
}
