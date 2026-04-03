export type Language = "en" | "es";

export type ToneOption = "Bold" | "Minimal" | "Luxury" | "Playful" | "Techy";

export type GenerateConceptInput = {
  idea: string;
  tone: ToneOption;
  language: Language;
};

export type ConceptResult = {
  product_name: string;
  tagline: string;
  value_proposition: string;
  target_audience: string;
  core_features: string[];
  hero_headline: string;
  hero_subheadline: string;
  cta: string;
  generatedAt: string;
};
