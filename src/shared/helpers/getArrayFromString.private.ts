import { createRandomId } from "@/shared/helpers";

export default (
  content: string
): { id: string; label: string; hint: string }[] => {
  const regex = /\[([^\]]+)\]/;
  const match = regex.exec(content);

  if (match) {
    const extractedSubstring = match[0];
    const items = JSON.parse(extractedSubstring) as {
      label: string;
      hint: string;
    }[];
    return items.map((item: { label: string; hint: string }) => ({
      ...item,
      id: createRandomId(),
    }));
  } else {
    return [];
  }
};
