// Shared
// import { useLocale } from "@/shared/hooks";

import {
  lifeSphere,
  goalDescription,
  taskRecommendationsAndPrecautions,
  taskRecommendedExpectedResults,
} from "./prompt/prompts.private";

type PromptName =
  | "lifeSphere"
  | "goalDescription"
  | "taskRecommendationsAndPrecautions"
  | "taskRecommendedExpectedResults";

type PlaceholderMap = {
  lifeSphere: {
    length: number;
    value: string;
  };
  goalDescription: {
    lifeSphere: string;
    title: string;
    description: string;
  };
  taskRecommendationsAndPrecautions: {
    LS: string;
    goal: string;
  };
  taskRecommendedExpectedResults: {
    LS: string;
    goal: string;
  };
};

type Prompt<T extends PromptName> = {
  [K in T]: string;
};

const prompt: Prompt<PromptName> = {
  lifeSphere,
  goalDescription,
  taskRecommendationsAndPrecautions,
  taskRecommendedExpectedResults,
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
    `Your answer must, without exception, be in ${language}. ${prompt[promptName]}`,
    placeholder
  );
};
