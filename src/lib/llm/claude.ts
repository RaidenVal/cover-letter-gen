import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider } from "./types";

export function createClaudeProvider(apiKey: string): LLMProvider {
  const client = new Anthropic({ apiKey });

  return {
    async complete(systemPrompt: string, userPrompt: string): Promise<string> {
      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });
      const textBlocks = message.content.filter(
        (block) => block.type === "text"
      );
      return textBlocks.map((block) => block.text).join("");
    },
  };
}
