export interface LLMProvider {
  complete(systemPrompt: string, userPrompt: string): Promise<string>;
}

export type ProviderName = "claude" | "openai" | "gemini";
