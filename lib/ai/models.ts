// Curated list of top models from Vercel AI Gateway
export const DEFAULT_CHAT_MODEL = "google/gemini-2.5-flash-lite";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  // OpenAI
  {
    id: "openai/gpt-5-mini",
    name: "Lite",
    provider: "openai",
    description: "Fast and cost-effective for simple tasks",
  },
  {
    id: "openai/gpt-5.2",
    name: "Core",
    provider: "openai",
    description: "Most capable OpenAI model",
  },
  {
    id: "openai/gpt-5.2-pro",
    name: "SUPREME",
    provider: "openai",
    description: "Most capable OpenAI model",
  },
];

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
