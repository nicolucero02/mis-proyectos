import { mockAnalyses } from "@/data/mock-analyses";
import type { Language } from "@/content/translations";
import type { LandingAnalysis } from "@/types/analysis";

const KEYWORDS = [
  { match: /agency|studio|consult|agencia|estudio|consultor/i, id: "agency-service" },
  {
    match: /mobile|app|consumer|habit|fitness|productivity|creador|creators|contenido/i,
    id: "consumer-app"
  },
  {
    match: /saas|dashboard|analytics|b2b|platform|startup|embudo|conversion|producto/i,
    id: "saas-analytics"
  }
] as const;

function resolveTemplateId(input: string) {
  const matchedId =
    KEYWORDS.find(({ match }) => match.test(input))?.id ??
    Object.keys(mockAnalyses.en)[input.length % Object.keys(mockAnalyses.en).length] ??
    Object.keys(mockAnalyses.en)[0];

  return matchedId;
}

export function buildMockAnalysis(
  templateId: string,
  language: Language,
  resultId: string
): LandingAnalysis {
  const baseAnalysis =
    mockAnalyses[language][templateId] ??
    mockAnalyses.en[templateId] ??
    Object.values(mockAnalyses[language])[0];

  return {
    ...baseAnalysis,
    id: resultId,
    template_id: templateId,
    language
  };
}

export function translateExistingAnalysis(
  analysis: LandingAnalysis,
  language: Language
): LandingAnalysis {
  return buildMockAnalysis(analysis.template_id, language, analysis.id);
}

export async function analyzeLandingMock(
  input: string,
  language: Language
): Promise<LandingAnalysis> {
  const templateId = resolveTemplateId(input);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(buildMockAnalysis(templateId, language, `${templateId}-${Date.now()}`));
    }, 1800);
  });
}
