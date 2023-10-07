import OpenAI from "openai";

interface SettingsGPT {
  content: string;
  role?: "function" | "user" | "system" | "assistant";
  temperature?: number;
  max_tokens?: number;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const askGPT = async ({
  content,
  role = "user",
  temperature = 1.2,
  max_tokens = 250,
}: SettingsGPT) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role, content }],
    temperature,
    max_tokens,
  });

  return {
    role: res.choices[0].message.role,
    id: res.id,
    content: res.choices[0].message.content,
    created: res.created,
  };
};
