export type Language = "en" | "es";

export interface TranslationMessages {
  language_name: string;
  product_tagline: string;
  language_toggle_label: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_chip_teardown: string;
  hero_chip_ux: string;
  hero_chip_design: string;
  input_eyebrow: string;
  input_heading: string;
  input_sr_label: string;
  input_placeholder: string;
  examples_heading: string;
  examples_helper: string;
  example_prompts: string[];
  helper_copy: string;
  button_analyze: string;
  preview_eyebrow: string;
  preview_body: string;
  loading: string;
  results_eyebrow: string;
  results_title: string;
  button_regenerate: string;
  button_copy: string;
  button_copied: string;
  first_impression: string;
  ux_issues: string;
  conversion_issues: string;
  design_feedback: string;
  improvement_suggestions: string;
}

export const translations: Record<Language, TranslationMessages> = {
  en: {
    language_name: "English",
    product_tagline: "Landing teardown engine",
    language_toggle_label: "Select language",
    hero_eyebrow: "Sharper conversion critique",
    hero_title: "Get brutally honest feedback on your landing",
    hero_subtitle:
      "Paste a landing page concept, product idea, or rough positioning draft and Convertify returns structured feedback on UX clarity, conversion friction, design decisions, and what to fix next.",
    hero_chip_teardown: "Structured teardown",
    hero_chip_ux: "UX + conversion lens",
    hero_chip_design: "Premium design critique",
    input_eyebrow: "Input your landing",
    input_heading: "Describe the offer, audience, and promise",
    input_sr_label: "Landing description",
    input_placeholder: "Describe your landing, offer, audience, and core promise...",
    examples_heading: "Quick test prompts",
    examples_helper: "Try one of these examples",
    example_prompts: [
      "AI tool for freelancers to write proposals faster",
      "Landing page for a football training platform",
      "SaaS for product teams to improve conversion rates",
      "App for creators to plan and publish content",
      "Marketplace for booking local sports coaches"
    ],
    helper_copy:
      "Mock insights for now. The service layer is already isolated for a later OpenAI integration.",
    button_analyze: "Analyze landing",
    preview_eyebrow: "Preview",
    preview_body:
      "Submit a landing description and Convertify will return a crisp first impression, UX issues, conversion risks, design feedback, and specific next moves.",
    loading:
      "Analyzing hierarchy, clarity, trust, friction, and conversion signals...",
    results_eyebrow: "Analysis output",
    results_title: "What Convertify would call out immediately",
    button_regenerate: "Regenerate",
    button_copy: "Copy results",
    button_copied: "Copied",
    first_impression: "First Impression",
    ux_issues: "UX Issues",
    conversion_issues: "Conversion Issues",
    design_feedback: "Design Feedback",
    improvement_suggestions: "Improvement Suggestions"
  },
  es: {
    language_name: "Español",
    product_tagline: "Motor de auditoría para landings",
    language_toggle_label: "Seleccionar idioma",
    hero_eyebrow: "Crítica de conversión más precisa",
    hero_title: "Obtén feedback brutalmente honesto sobre tu landing",
    hero_subtitle:
      "Pega una idea, landing o propuesta y Convertify devuelve feedback estructurado sobre claridad UX, fricción de conversión, decisiones de diseño y qué mejorar después.",
    hero_chip_teardown: "Auditoría estructurada",
    hero_chip_ux: "Enfoque UX + conversión",
    hero_chip_design: "Crítica de diseño premium",
    input_eyebrow: "Tu landing",
    input_heading: "Describe la oferta, audiencia y propuesta",
    input_sr_label: "Descripción de la landing",
    input_placeholder: "Describe tu landing, oferta, audiencia y propuesta principal...",
    examples_heading: "Prompts para probar",
    examples_helper: "Prueba uno de estos ejemplos",
    example_prompts: [
      "Herramienta de IA para freelancers que quieren escribir propuestas más rápido",
      "Landing page para una plataforma de entrenamiento de fútbol",
      "SaaS para equipos de producto que buscan mejorar la conversión",
      "App para creadores que quieren planificar y publicar contenido",
      "Marketplace para reservar entrenadores deportivos locales",
      "Plataforma para analizar embudos de venta"
    ],
    helper_copy:
      "Por ahora usamos insights simulados. La capa de servicio ya está aislada para integrar OpenAI más adelante.",
    button_analyze: "Analizar landing",
    preview_eyebrow: "Vista previa",
    preview_body:
      "Envía la descripción de una landing y Convertify devolverá una primera impresión clara, problemas de UX, riesgos de conversión, feedback de diseño y mejoras concretas.",
    loading:
      "Analizando jerarquía, claridad, confianza, fricción y señales de conversión...",
    results_eyebrow: "Resultado del análisis",
    results_title: "Lo que Convertify señalaría de inmediato",
    button_regenerate: "Regenerar",
    button_copy: "Copiar resultados",
    button_copied: "Copiado",
    first_impression: "Primera impresión",
    ux_issues: "Problemas de UX",
    conversion_issues: "Problemas de conversión",
    design_feedback: "Feedback de diseño",
    improvement_suggestions: "Sugerencias de mejora"
  }
};
