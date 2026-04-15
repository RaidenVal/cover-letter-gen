import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LLMProvider } from "./types";

export function createGeminiProvider(apiKey: string): LLMProvider {
  const client = new GoogleGenerativeAI(apiKey);

  return {
    async complete(systemPrompt: string, userPrompt: string): Promise<string> {
      const model = client.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt,
      });
      const result = await model.generateContent(userPrompt);
      return result.response.text();
    },
  };
}
