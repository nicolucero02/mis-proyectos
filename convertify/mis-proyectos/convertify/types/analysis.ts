import type { Language } from "@/content/translations";

export interface LandingAnalysis {
  id: string;
  template_id: string;
  language: Language;
  first_impression: string;
  ux_issues: string[];
  conversion_issues: string[];
  design_feedback: string[];
  improvement_suggestions: string[];
}

export type AnalysisSectionKey =
  | "ux_issues"
  | "conversion_issues"
  | "design_feedback"
  | "improvement_suggestions";
