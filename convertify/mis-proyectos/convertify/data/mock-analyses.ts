import type { Language } from "@/content/translations";
import type { LandingAnalysis } from "@/types/analysis";

type AnalysisTemplate = Omit<LandingAnalysis, "id" | "language" | "template_id">;

export const mockAnalyses: Record<
  Language,
  Record<string, AnalysisTemplate>
> = {
  en: {
    "saas-analytics": {
      first_impression:
        "The offer feels credible and premium, but the message takes too long to reveal who it is for and why acting now matters.",
      ux_issues: [
        "The headline suggests value, but the audience is still implied instead of explicit.",
        "The page likely asks visitors to read before it proves outcomes, which slows scanning.",
        "If the hero is too dense, mobile users may miss the primary action before the fold."
      ],
      conversion_issues: [
        "Urgency is weak because the cost of waiting is not framed clearly.",
        "The CTA probably sounds generic and does not promise a concrete next step.",
        "Without proof near the hero, skeptical buyers have an easy reason to postpone."
      ],
      design_feedback: [
        "The premium tone works, but hierarchy between headline, support copy, and CTA needs to be sharper.",
        "Visual polish should reinforce trust instead of competing with the value proposition.",
        "Contrast and spacing should make the reading path obvious within a few seconds."
      ],
      improvement_suggestions: [
        "Rewrite the hero so audience, outcome, and timing are clear in one sentence.",
        "Add a proof strip directly under the hero with logos, metrics, or concise testimonials.",
        "Use a CTA that promises a specific action, such as 'See a teardown' or 'Book a review'."
      ]
    },
    "consumer-app": {
      first_impression:
        "The concept sounds useful, but the page likely explains features before it makes the payoff feel emotionally immediate.",
      ux_issues: [
        "Visitors may struggle to understand the core job-to-be-done at a glance.",
        "The page probably needs a clearer visual demo that anchors the product in reality.",
        "If several CTAs compete in the hero, attention gets diluted too early."
      ],
      conversion_issues: [
        "Trust will be fragile without social proof, especially for a new consumer product.",
        "The offer may not lower risk enough with a free trial, guarantee, or low-friction entry point.",
        "The messaging may focus on features instead of the user's before-and-after."
      ],
      design_feedback: [
        "The design should feel more deliberate and memorable than a typical indie app launch.",
        "Reduce competing accents and let one color guide the next step.",
        "Motion should clarify the product flow instead of acting as decoration."
      ],
      improvement_suggestions: [
        "Lead with the transformation first, then support it with a short product walkthrough.",
        "Choose one dominant CTA and demote secondary actions.",
        "Add a trust-reducing detail such as 'No card required' or a public preview."
      ]
    },
    "agency-service": {
      first_impression:
        "The positioning feels premium, but the page will sound interchangeable unless the niche and outcome become painfully specific.",
      ux_issues: [
        "Agency pages often lean on abstract language instead of concrete deliverables.",
        "Case studies may sit too far down the page to influence first-pass evaluation.",
        "Navigation can create too many escape routes before visitors absorb the core hook."
      ],
      conversion_issues: [
        "The page may ask for a call before it has earned enough trust.",
        "Without a teardown or audit offer, the next step feels too high-commitment.",
        "Weak differentiation makes price the default comparison point."
      ],
      design_feedback: [
        "A restrained dark interface fits, but content contrast must be strong enough to avoid vagueness.",
        "Oversized, confident typography would better signal expertise.",
        "Sections should feel dense with signal, not ornamental."
      ],
      improvement_suggestions: [
        "Package the offer around a narrow problem with a named method or outcome.",
        "Bring one strong case study above the fold instead of hiding it deeper in the page.",
        "Offer a teardown or audit CTA before asking for a sales call."
      ]
    }
  },
  es: {
    "saas-analytics": {
      first_impression:
        "La oferta se percibe sólida y premium, pero el mensaje tarda demasiado en dejar claro para quién es y por qué conviene actuar ahora.",
      ux_issues: [
        "El titular insinúa valor, pero la audiencia sigue siendo implícita en vez de explícita.",
        "La página probablemente obliga a leer antes de demostrar resultados, y eso frena el escaneo.",
        "Si el hero está demasiado cargado, en mobile se puede perder la acción principal antes del primer scroll."
      ],
      conversion_issues: [
        "La urgencia es débil porque el costo de esperar no está planteado con claridad.",
        "Es probable que el CTA suene genérico y no prometa un siguiente paso concreto.",
        "Sin prueba cerca del hero, a los usuarios escépticos les queda una salida fácil para postergar."
      ],
      design_feedback: [
        "El tono premium funciona, pero la jerarquía entre titular, texto de apoyo y CTA debería ser más nítida.",
        "El acabado visual debería reforzar la confianza, no competir con la propuesta de valor.",
        "El contraste y el espaciado tienen que hacer evidente el recorrido de lectura en pocos segundos."
      ],
      improvement_suggestions: [
        "Reescribe el hero para dejar claro en una sola frase la audiencia, el resultado y el plazo.",
        "Agrega una franja de prueba justo debajo del hero con logos, métricas o testimonios breves.",
        "Usa un CTA que prometa una acción específica, como 'Ver auditoría' o 'Reservar revisión'."
      ]
    },
    "consumer-app": {
      first_impression:
        "La idea suena útil, pero la página probablemente explica funciones antes de hacer tangible el beneficio emocional.",
      ux_issues: [
        "A simple vista puede costar entender cuál es el trabajo principal que resuelve el producto.",
        "La página seguramente necesita una demo visual más clara que ancle el producto en algo real.",
        "Si hay varios CTA compitiendo en el hero, la atención se diluye demasiado pronto."
      ],
      conversion_issues: [
        "La confianza será frágil sin prueba social, sobre todo para un producto de consumo nuevo.",
        "La oferta quizá no reduce suficiente fricción con una prueba gratis, garantía o entrada de bajo compromiso.",
        "Es posible que el mensaje esté más centrado en funcionalidades que en el antes y después del usuario."
      ],
      design_feedback: [
        "El diseño debería sentirse más intencional y memorable que el de una app indie promedio.",
        "Conviene reducir acentos que compiten entre sí y dejar que un solo color guíe la siguiente acción.",
        "La animación debería aclarar el flujo del producto, no sumar decoración."
      ],
      improvement_suggestions: [
        "Abre con la transformación que promete el producto y luego respáldala con una demo breve.",
        "Elegí un CTA dominante y relegá las acciones secundarias.",
        "Sumá un detalle que reduzca riesgo, como 'Sin tarjeta' o una vista pública."
      ]
    },
    "agency-service": {
      first_impression:
        "El posicionamiento se siente premium, pero la página va a sonar intercambiable si no vuelve muy específico el nicho y el resultado.",
      ux_issues: [
        "Las páginas de agencia suelen apoyarse demasiado en lenguaje abstracto en lugar de entregables concretos.",
        "Los casos de estudio pueden estar demasiado abajo como para influir en la primera evaluación.",
        "La navegación puede abrir demasiadas salidas antes de que el visitante entienda el gancho principal."
      ],
      conversion_issues: [
        "La página puede estar pidiendo una llamada antes de haber ganado suficiente confianza.",
        "Sin una auditoría o teardown como oferta inicial, el siguiente paso se siente demasiado exigente.",
        "Una diferenciación débil hace que el precio se convierta en el criterio principal de comparación."
      ],
      design_feedback: [
        "Una interfaz oscura y sobria encaja bien, pero el contraste del contenido debe ser fuerte para no sentirse vaga.",
        "Una tipografía más grande y segura comunicaría mejor autoridad.",
        "Las secciones deberían sentirse cargadas de señal útil, no ornamentales."
      ],
      improvement_suggestions: [
        "Empaquetá la oferta alrededor de un problema muy concreto con un método o resultado nombrado.",
        "Subí un caso de estudio potente por encima del fold en lugar de esconderlo más abajo.",
        "Ofrecé un CTA de auditoría o teardown antes de pedir una llamada comercial."
      ]
    }
  }
};
