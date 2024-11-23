export type SphereLangItem = { label: string; hint: string };

type SphereBody = {
  id: string;
  created?: string;
  en: SphereLangItem;
  de: SphereLangItem;
  ka: SphereLangItem;
  ua: SphereLangItem;
  ru: SphereLangItem;
};

export type Sphere = SphereBody | null;
