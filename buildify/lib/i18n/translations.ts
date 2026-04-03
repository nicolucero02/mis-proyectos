import type { ToneOption } from "@/types/concept";

export type Language = "en" | "es";

type TranslationShape = {
  header: {
    badge: string;
    mvp: string;
    nav: {
      product: string;
      workflow: string;
      output: string;
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    helper: string;
    placeholder: string;
    toneHelper: string;
    generate: string;
    generating: string;
    examplesLabel: string;
    examples: string[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  tone: {
    title: string;
    labels: Record<ToneOption, string>;
  };
  results: {
    eyebrow: string;
    title: string;
    regenerate: string;
    copy: string;
    empty: string;
    emptyTitle: string;
    emptyHint: string;
    labels: {
      productName: string;
      tagline: string;
      valueProposition: string;
      targetAudience: string;
      coreFeatures: string;
      heroHeadline: string;
      heroSubheadline: string;
      cta: string;
    };
  };
  status: {
    ready: string;
    generating: string;
    generated: string;
    copied: string;
    lastGenerated: string;
    notGenerated: string;
  };
  language: {
    en: string;
    es: string;
  };
  footer: {
    tagline: string;
    note: string;
  };
};

export const translations: Record<Language, TranslationShape> = {
  en: {
    header: {
      badge: "Buildify",
      mvp: "Mock-powered MVP",
      nav: {
        product: "Product",
        workflow: "How it works",
        output: "Output",
      },
    },
    hero: {
      eyebrow: "Premium product concept generator",
      title: "Turn raw ideas into product concepts",
      subtitle:
        "Write a rough startup idea and get a polished concept with naming, positioning, hero copy, and launch-ready direction.",
      helper: "Describe the product in one or two clear sentences.",
      placeholder:
        "A fintech app that helps remote teams manage shared budgets, approvals, and vendor payments.",
      toneHelper: "Tone selection influences naming, messaging, and copy direction.",
      generate: "Generate concept",
      generating: "Generating...",
      examplesLabel: "Try one of these",
      examples: [
        "An AI assistant for legal teams that turns contracts into plain-language summaries.",
        "A platform that helps boutique fitness studios retain members with personalized recovery plans.",
        "A B2B tool that turns customer calls into product insights and roadmap briefs.",
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From rough signal to sharp concept in three clear moves",
      steps: [
        {
          title: "Share the raw idea",
          description: "Describe the startup, product, or opportunity in a few honest sentences.",
        },
        {
          title: "Choose the tone",
          description: "Guide the direction with a voice that feels bold, minimal, luxury, playful, or techy.",
        },
        {
          title: "Get launch-ready output",
          description: "Receive naming, positioning, target audience, key features, hero copy, and CTA.",
        },
      ],
    },
    tone: {
      title: "Tone",
      labels: {
        Bold: "Bold",
        Minimal: "Minimal",
        Luxury: "Luxury",
        Playful: "Playful",
        Techy: "Techy",
      },
    },
    results: {
      eyebrow: "Results",
      title: "Presentation-ready concept output",
      regenerate: "Regenerate",
      copy: "Copy result",
      empty: "Your generated concept will appear here with naming, positioning, and hero copy.",
      emptyTitle: "A polished concept will appear here",
      emptyHint: "Generate once to reveal structured naming, product framing, audience definition, and launch-ready hero messaging.",
      labels: {
        productName: "Product Name",
        tagline: "Tagline",
        valueProposition: "Value Proposition",
        targetAudience: "Target Audience",
        coreFeatures: "Core Features",
        heroHeadline: "Hero Headline",
        heroSubheadline: "Hero Subheadline",
        cta: "CTA",
      },
    },
    status: {
      ready: "Ready to shape your next concept.",
      generating: "Crafting positioning, naming, and launch-ready copy...",
      generated: "Concept generated. You can refine tone or regenerate instantly.",
      copied: "Concept copied to clipboard.",
      lastGenerated: "Last concept generated",
      notGenerated: "No concept generated yet",
    },
    language: {
      en: "EN",
      es: "ES",
    },
    footer: {
      tagline: "Buildify shapes raw startup ideas into premium concept drafts.",
      note: "Built for fast concept exploration with mock generation and future-ready AI integration.",
    },
  },
  es: {
    header: {
      badge: "Buildify",
      mvp: "MVP con mocks",
      nav: {
        product: "Producto",
        workflow: "Cómo funciona",
        output: "Resultado",
      },
    },
    hero: {
      eyebrow: "Generador premium de conceptos de producto",
      title: "Convierte ideas en conceptos de producto",
      subtitle:
        "Escribe una idea y obtén un concepto completo con naming, posicionamiento y copy.",
      helper: "Describe el producto en una o dos frases claras.",
      placeholder:
        "Una app fintech que ayuda a equipos remotos a gestionar presupuestos compartidos, aprobaciones y pagos a proveedores.",
      toneHelper: "El tono influye en el naming, el mensaje y la dirección del copy.",
      generate: "Generar concepto",
      generating: "Generando...",
      examplesLabel: "Prueba con una de estas",
      examples: [
        "Un asistente de IA para equipos legales que convierte contratos en resúmenes simples.",
        "Una plataforma que ayuda a estudios boutique de fitness a retener clientes con planes de recuperación personalizados.",
        "Una herramienta B2B que convierte llamadas con clientes en insights de producto y briefs de roadmap.",
      ],
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: "De una idea en bruto a un concepto preciso en tres pasos claros",
      steps: [
        {
          title: "Comparte la idea",
          description: "Describe la startup, el producto o la oportunidad en unas pocas frases concretas.",
        },
        {
          title: "Elige el tono",
          description: "Guía la dirección con una voz audaz, minimal, luxury, lúdica o techy.",
        },
        {
          title: "Obtén salida lista para lanzar",
          description: "Recibe naming, posicionamiento, audiencia, funciones clave, hero copy y CTA.",
        },
      ],
    },
    tone: {
      title: "Tono",
      labels: {
        Bold: "Audaz",
        Minimal: "Minimal",
        Luxury: "Luxury",
        Playful: "Lúdico",
        Techy: "Techy",
      },
    },
    results: {
      eyebrow: "Resultados",
      title: "Salida lista para presentar",
      regenerate: "Regenerar",
      copy: "Copiar resultado",
      empty: "Tu concepto generado aparecerá aquí con naming, posicionamiento y hero copy.",
      emptyTitle: "Aquí aparecerá un concepto pulido",
      emptyHint: "Genera una vez para revelar naming estructurado, framing de producto, definición de audiencia y mensajes hero listos para lanzar.",
      labels: {
        productName: "Nombre del producto",
        tagline: "Tagline",
        valueProposition: "Propuesta de valor",
        targetAudience: "Público objetivo",
        coreFeatures: "Funciones clave",
        heroHeadline: "Hero Headline",
        heroSubheadline: "Hero Subheadline",
        cta: "CTA",
      },
    },
    status: {
      ready: "Listo para dar forma a tu próximo concepto.",
      generating: "Definiendo posicionamiento, naming y copy listo para lanzamiento...",
      generated: "Concepto generado. Puedes ajustar el tono o regenerarlo al instante.",
      copied: "Concepto copiado al portapapeles.",
      lastGenerated: "Último concepto generado",
      notGenerated: "Todavía no hay un concepto generado",
    },
    language: {
      en: "EN",
      es: "ES",
    },
    footer: {
      tagline: "Buildify transforma ideas de startup en borradores de concepto con acabado premium.",
      note: "Hecho para explorar conceptos rápido con generación mock y una base lista para integrar IA después.",
    },
  },
};
