import { createRandomId } from "@/shared/helpers";

export default <T>(content: string): T[] => {
  const regex = /\[([^\]]+)\]/;
  const match = regex.exec(content);

  if (match) {
    const extractedSubstring = match[0];
    const items = JSON.parse(extractedSubstring) as T[];
    return items.map((item: T) => ({
      ...item,
      id: createRandomId(),
    }));
  } else {
    return [];
  }
};
