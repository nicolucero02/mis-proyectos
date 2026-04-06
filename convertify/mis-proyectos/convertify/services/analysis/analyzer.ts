import type { Language } from "@/content/translations";
import { analyzeLandingMock } from "@/lib/mock-analysis";
import type { LandingAnalysis } from "@/types/analysis";

export interface Analyzer {
  analyze(input: string, language: Language): Promise<LandingAnalysis>;
}

class MockAnalyzer implements Analyzer {
  async analyze(input: string, language: Language) {
    return analyzeLandingMock(input, language);
  }
}

export const analyzer: Analyzer = new MockAnalyzer();
