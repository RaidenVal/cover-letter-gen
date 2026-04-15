import type { LLMProvider, ProviderName } from "./types";
import { createClaudeProvider } from "./claude";
import { createOpenAIProvider } from "./openai";
import { createGeminiProvider } from "./gemini";

export type { LLMProvider, ProviderName };

export function createProvider(name: ProviderName, apiKey: string): LLMProvider {
  switch (name) {
    case "claude":
      return createClaudeProvider(apiKey);
    case "openai":
      return createOpenAIProvider(apiKey);
    case "gemini":
      return createGeminiProvider(apiKey);
  }
}
