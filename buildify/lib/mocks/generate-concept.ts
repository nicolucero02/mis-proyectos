import type {
  ConceptResult,
  GenerateConceptInput,
  Language,
  ToneOption,
} from "@/types/concept";

type TonePreset = {
  suffixes: string[];
  taglineStyle: string;
  adjectives: string[];
  audienceHint: string;
  cta: string;
  heroVerb: string;
};

const TONE_PRESETS: Record<Language, Record<ToneOption, TonePreset>> = {
  en: {
    Bold: {
      suffixes: ["Forge", "Strike", "Launch", "Drive"],
      taglineStyle: "Move first with",
      adjectives: ["decisive", "high-conviction", "market-shaping"],
      audienceHint: "fast-moving founders and operators",
      cta: "Launch the concept",
      heroVerb: "gives",
    },
    Minimal: {
      suffixes: ["One", "Frame", "Form", "Plain"],
      taglineStyle: "A cleaner way to",
      adjectives: ["focused", "clear", "essential"],
      audienceHint: "teams that value clarity over complexity",
      cta: "Generate the concept",
      heroVerb: "gives",
    },
    Luxury: {
      suffixes: ["Atelier", "Maison", "Reserve", "Studio"],
      taglineStyle: "Elevated",
      adjectives: ["refined", "high-trust", "premium"],
      audienceHint: "premium brands and design-conscious operators",
      cta: "Reveal the concept",
      heroVerb: "gives",
    },
    Playful: {
      suffixes: ["Pop", "Spark", "Loop", "Bloom"],
      taglineStyle: "A brighter way to",
      adjectives: ["friendly", "fresh", "delightful"],
      audienceHint: "creative teams building memorable digital products",
      cta: "Make it real",
      heroVerb: "gives",
    },
    Techy: {
      suffixes: ["Stack", "Flow", "Grid", "Pilot"],
      taglineStyle: "Infrastructure for",
      adjectives: ["intelligent", "scalable", "modern"],
      audienceHint: "startup teams shipping software fast",
      cta: "Generate concept",
      heroVerb: "gives",
    },
  },
  es: {
    Bold: {
      suffixes: ["Forge", "Strike", "Launch", "Drive"],
      taglineStyle: "Muévete primero con",
      adjectives: ["decisiva", "contundente", "capaz de marcar mercado"],
      audienceHint: "founders y operadores que se mueven rápido",
      cta: "Lanzar concepto",
      heroVerb: "le da",
    },
    Minimal: {
      suffixes: ["One", "Frame", "Form", "Plain"],
      taglineStyle: "Una forma más clara de",
      adjectives: ["enfocada", "clara", "esencial"],
      audienceHint: "equipos que valoran la claridad por encima de la complejidad",
      cta: "Generar concepto",
      heroVerb: "le da",
    },
    Luxury: {
      suffixes: ["Atelier", "Maison", "Reserve", "Studio"],
      taglineStyle: "Una propuesta elevada para",
      adjectives: ["refinada", "premium", "de alta confianza"],
      audienceHint: "marcas premium y operadores sensibles al diseño",
      cta: "Revelar concepto",
      heroVerb: "le da",
    },
    Playful: {
      suffixes: ["Pop", "Spark", "Loop", "Bloom"],
      taglineStyle: "Una forma más vibrante de",
      adjectives: ["amigable", "fresca", "memorable"],
      audienceHint: "equipos creativos que construyen productos digitales memorables",
      cta: "Hazlo real",
      heroVerb: "le da",
    },
    Techy: {
      suffixes: ["Stack", "Flow", "Grid", "Pilot"],
      taglineStyle: "Infraestructura para",
      adjectives: ["inteligente", "escalable", "moderna"],
      audienceHint: "equipos startup que envían software rápido",
      cta: "Generar concepto",
      heroVerb: "le da",
    },
  },
};

function pickKeyword(idea: string) {
  const cleaned = idea
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const stopwords = new Set([
    "that",
    "with",
    "from",
    "into",
    "your",
    "this",
    "have",
    "helps",
    "help",
    "digital",
    "product",
    "startup",
  ]);

  return cleaned.find((word) => !stopwords.has(word)) ?? "Nova";
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function deriveProductName(idea: string, tone: ToneOption, language: Language) {
  const keyword = titleCase(pickKeyword(idea));
  const preset = TONE_PRESETS[language][tone];
  const suffix = preset.suffixes[idea.length % preset.suffixes.length];

  return `${keyword}${suffix}`;
}

export async function generateMockConcept({
  idea,
  tone,
  language,
}: GenerateConceptInput): Promise<ConceptResult> {
  const preset = TONE_PRESETS[language][tone];
  const productName = deriveProductName(idea, tone, language);
  const subject = pickKeyword(idea);
  const adjective = preset.adjectives[idea.length % preset.adjectives.length];

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    product_name: productName,
    tagline:
      language === "es"
        ? `${preset.taglineStyle} equipos impulsados por ${subject}.`
        : `${preset.taglineStyle} ${subject}-driven teams.`,
    value_proposition:
      language === "es"
        ? `${productName} transforma ${idea.trim()} en una narrativa de producto ${adjective}, con posicionamiento claro, mejor mensaje y un concepto listo para presentar en minutos.`
        : `${productName} transforms ${idea.trim()} into a ${adjective} product narrative with clear positioning, sharper messaging, and a presentation-ready concept in minutes.`,
    target_audience:
      language === "es"
        ? `Pensado para ${preset.audienceHint} que necesitan validar y presentar nuevas ideas sin perder impulso.`
        : `Built for ${preset.audienceHint} who need to validate and pitch new ideas without losing momentum.`,
    core_features: [
      language === "es"
        ? `Marco conceptual guiado por IA y adaptado a una voz de marca ${tone.toLowerCase()}`
        : `AI-guided concept framing tailored to a ${tone.toLowerCase()} brand voice`,
      language === "es"
        ? "Generación de nombre y tagline alineados con el posicionamiento"
        : "Name and tagline generation aligned with market positioning",
      language === "es"
        ? "Propuesta de valor y audiencia objetivo estructuradas"
        : "Structured value proposition and audience definition",
      language === "es"
        ? "Hero copy y CTA listos para landing pages o decks"
        : "Hero copy and CTA blocks ready for landing pages or decks",
    ],
    hero_headline:
      language === "es"
        ? `${productName} ${preset.heroVerb} una forma más definida a tu próxima idea.`
        : `${productName} gives your next idea a sharper shape.`,
    hero_subheadline:
      language === "es"
        ? `Pasa de una idea en bruto a un posicionamiento pulido con mensajes ${adjective}, mejor framing de producto y una historia que inversores o clientes entienden al instante.`
        : `Go from raw concept to polished positioning with ${adjective} messaging, strong product framing, and a story investors or customers can understand instantly.`,
    cta: preset.cta,
    generatedAt: new Date().toISOString(),
  };
}
