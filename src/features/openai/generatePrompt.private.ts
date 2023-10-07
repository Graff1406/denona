// Shared
import { useLocale } from "@/shared/hooks";

import { lifeSphere } from "./prompt/prompts.private";

type PromptName = "lifeSphere";

type PlaceholderMap = {
  lifeSphere: {
    length: number;
    value: string;
  };
};

type Prompt<T extends PromptName> = {
  [K in T]: string;
};

const prompt: Prompt<PromptName> = {
  lifeSphere,
};

type Placeholder<T extends PromptName> = PlaceholderMap[T];

const replacePlaceholders = (
  template: string,
  placeholders: Record<string, string | number>
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
    if (placeholder in placeholders) {
      return String(placeholders[placeholder]);
    }
    return match;
  });
};

export const generatePrompt = <T extends PromptName>(
  promptName: T,
  placeholder: Placeholder<T>,
  language = "English"
) => {
  return replacePlaceholders(
    `the response from you must be in ${language}. ${prompt[promptName]}`,
    placeholder
  );
};
