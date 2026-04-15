export interface Story {
  id: string;
  title: string;
  tags: string[];
  date: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  createdAt: number;
  updatedAt: number;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  currentRole: string;
  summary: string;
  rawText: string;
  fileName: string;
  uploadedAt: number;
}

export interface Settings {
  llmProvider: "claude" | "openai" | "gemini";
  apiKey: string;
}

export interface JDAnalysis {
  companyName: string;
  roleTitle: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  companyValues: string[];
  rawText: string;
}

export interface MatchedStory {
  story: Story;
  relevance: string;
  matchedSkills: string[];
}

export interface CoverLetter {
  id: string;
  content: string;
  jdAnalysis: JDAnalysis;
  matchedStories: MatchedStory[];
  cvData: CVData;
  createdAt: number;
}
