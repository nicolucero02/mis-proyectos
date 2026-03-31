export type Locale = "es" | "en";

export type LocalizedText = {
  es: string;
  en: string;
};

export const LOCALE_COOKIE = "comicverse-locale";

export function pickText(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export const dictionary = {
  es: {
    nav: {
      home: "Inicio",
      blog: "Blog",
      categories: "Categorías",
      rankings: "Rankings",
      guides: "Guías",
      about: "Acerca",
      issue: "Edición 01"
    },
    common: {
      all: "Todas",
      authorBy: "Por",
      category: "Categoría",
      readTime: "de lectura",
      explore: "Explorar",
      openArticle: "Abrir artículo",
      readFeature: "Leer reportaje",
      backToArchive: "Volver al archivo",
      previousArticle: "Artículo anterior",
      nextArticle: "Artículo siguiente",
      inThisArticle: "En esta nota",
      navigation: "Navegación",
      related: "Relacionados",
      continueReading: "Seguir leyendo",
      noIndex: "Este artículo no incluye subtítulos suficientes para un índice.",
      breadcrumbsHome: "Inicio",
      breadcrumbsBlog: "Blog",
      themeLight: "Claro",
      themeDark: "Oscuro",
      language: "Idioma"
    },
    home: {
      heroEyebrow: "Editorial de cómics",
      heroSubtitle:
        "Un archivo editorial sobre superhéroes, novela gráfica y cultura visual, con criterio de revista y lectura contemporánea.",
      heroPrimary: "Leer artículos",
      heroSecondary: "Ver guías",
      heroStatsArchive: "Archivo",
      heroStatsArchiveValue: "6",
      heroStatsArchiveText: "Ensayos y notas publicados",
      heroStatsSections: "Verticales",
      heroStatsSectionsValue: "6",
      heroStatsSectionsText: "Categorías editoriales activas",
      heroStatsFormat: "Formato",
      heroStatsFormatValue: "MDX",
      heroStatsFormatText: "Contenido local con lectura larga",
      spotlight: "Spotlight",
      spotlightTitle: "La pieza central de esta edición",
      featuredEyebrow: "Destacados",
      featuredTitle: "Historias y ensayos con foco editorial",
      featuredDescription:
        "Una portada pensada como magazine: una pieza principal y notas secundarias con peso visual propio.",
      categoriesEyebrow: "Categorías",
      categoriesTitle: "Secciones curadas como verticales editoriales",
      categoriesDescription:
        "Marvel, DC, indie, novela gráfica y otros enfoques para navegar el archivo con más precisión.",
      rankingsEyebrow: "Rankings",
      rankingsTitle: "Listas curadas para leer mejor, no solo más",
      rankingsDescription:
        "Selecciones con criterio de redacción para orientar entradas, runs y obras clave.",
      rankingsLink: "Ir a rankings",
      guidesEyebrow: "Guías",
      guidesTitle: "Rutas de lectura para empezar con contexto",
      guidesDescription:
        "Guías introductorias que funcionan como servicio editorial y punto de entrada al archivo.",
      guidesLink: "Ir a guías",
      latestEyebrow: "Últimos artículos",
      latestTitle: "Archivo reciente",
      latestDescription:
        "Tarjetas con cubiertas visuales, firma, categoría, fecha y tiempo de lectura.",
      latestLink: "Abrir archivo",
      newsletterEyebrow: "Newsletter editorial",
      newsletterTitle: "Un briefing semanal de cómics con criterio y contexto.",
      newsletterDescription:
        "Esta caja no suscribe a nada real, pero aporta la pieza visual que una revista digital necesita: llamada editorial, jerarquía y cierre de página.",
      newsletterPlaceholder: "tu@email.com",
      newsletterButton: "Suscribirme",
      closingEyebrow: "Cierre editorial",
      closingTitle: "Una plataforma hecha para escribir sobre cómics con seriedad visual.",
      closingBodyOne:
        "ComicVerse no busca parecer un starter genérico. La grilla, la jerarquía tipográfica y los bloques de contenido apuntan a una presencia más cercana a una revista digital premium.",
      closingBodyTwo:
        "El proyecto sigue usando MDX local, Next.js App Router y Tailwind, pero ahora la arquitectura visual soporta categorías, rankings, guías y lectura larga.",
      closingLink: "Leer manifiesto editorial"
    },
    blog: {
      eyebrow: "Archivo",
      title: "Blog editorial",
      description:
        "Ensayos, notas, procesos y recomendaciones en una página que funciona como archivo real.",
      searchLabel: "Buscar",
      searchPlaceholder: "Buscar por título, tema o autor",
      filter: "Filtrar"
    },
    categories: {
      eyebrow: "Mapa del sitio",
      title: "Categorías",
      description:
        "Secciones permanentes para explorar el archivo por tono, universo y tipo de lectura.",
      titlePrefix: "Categoría"
    },
    rankings: {
      eyebrow: "Curaduría",
      title: "Rankings",
      description:
        "Listas construidas como piezas de redacción: orden, criterio y puntos de entrada útiles para seguir leyendo."
    },
    guides: {
      eyebrow: "Servicio editorial",
      title: "Guías de lectura",
      description:
        "Rutas pensadas para principiantes y lectores intermedios que buscan contexto antes que volumen."
    },
    about: {
      eyebrow: "Sobre ComicVerse",
      title: "Un proyecto editorial para hablar de cómics con ambición visual y criterio.",
      description:
        "ComicVerse existe para reunir crítica visual, guías de lectura y curaduría en una interfaz que no rebaje el tema a un blog genérico. La idea es tratar al cómic como cultura, forma y archivo.",
      missionTitle: "Misión",
      missionBody:
        "Construir un espacio donde recomendaciones, contexto y análisis convivan con una presentación editorial sólida.",
      toneTitle: "Tono",
      toneBody:
        "Elegante, claro y contemporáneo. Más cerca de una revista cultural que de un fan site o un starter de portfolio.",
      whyTitle: "Por qué existe",
      whyBody:
        "Porque el medio merece una plataforma que combine orientación para lectores nuevos con piezas de lectura larga y diseño serio."
    },
    footer: {
      eyebrow: "Plataforma editorial",
      description:
        "Plataforma editorial sobre cómics, narrativa visual y rutas de lectura para construir un archivo con criterio.",
      note:
        "Pensado para portfolio, pero con una puesta visual y una jerarquía de contenido más cercana a una revista digital que a un template básico.",
      navigation: "Navegación",
      categories: "Categorías",
      legalLeft: "ComicVerse. Demo editorial construida con Next.js y MDX local.",
      legalRight: "Diseño bilingüe con tono de revista y archivo curado."
    }
  },
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      categories: "Categories",
      rankings: "Rankings",
      guides: "Guides",
      about: "About",
      issue: "Issue 01"
    },
    common: {
      all: "All",
      authorBy: "By",
      category: "Category",
      readTime: "read",
      explore: "Explore",
      openArticle: "Open article",
      readFeature: "Read feature",
      backToArchive: "Back to archive",
      previousArticle: "Previous article",
      nextArticle: "Next article",
      inThisArticle: "In this story",
      navigation: "Navigation",
      related: "Related",
      continueReading: "Continue reading",
      noIndex: "This article does not include enough subheadings for an index.",
      breadcrumbsHome: "Home",
      breadcrumbsBlog: "Blog",
      themeLight: "Light",
      themeDark: "Dark",
      language: "Language"
    },
    home: {
      heroEyebrow: "Comics editorial",
      heroSubtitle:
        "An editorial archive about superheroes, graphic novels, and visual culture, shaped with magazine logic and contemporary pacing.",
      heroPrimary: "Read stories",
      heroSecondary: "Browse guides",
      heroStatsArchive: "Archive",
      heroStatsArchiveValue: "6",
      heroStatsArchiveText: "Published essays and features",
      heroStatsSections: "Sections",
      heroStatsSectionsValue: "6",
      heroStatsSectionsText: "Active editorial verticals",
      heroStatsFormat: "Format",
      heroStatsFormatValue: "MDX",
      heroStatsFormatText: "Local longform content",
      spotlight: "Spotlight",
      spotlightTitle: "The central piece of this issue",
      featuredEyebrow: "Featured",
      featuredTitle: "Stories and essays with editorial weight",
      featuredDescription:
        "A magazine-style front page with one leading feature and secondary stories that still carry visual authority.",
      categoriesEyebrow: "Categories",
      categoriesTitle: "Sections shaped like editorial verticals",
      categoriesDescription:
        "Marvel, DC, indie, graphic novels, and other lenses for navigating the archive with more precision.",
      rankingsEyebrow: "Rankings",
      rankingsTitle: "Curated lists designed to help you read better, not just more",
      rankingsDescription:
        "Editorial selections meant to orient entry points, runs, and key works with clarity.",
      rankingsLink: "Go to rankings",
      guidesEyebrow: "Guides",
      guidesTitle: "Reading paths built around context",
      guidesDescription:
        "Beginner-friendly guides that work as editorial service and as entry points to the archive.",
      guidesLink: "Go to guides",
      latestEyebrow: "Latest stories",
      latestTitle: "Recent archive",
      latestDescription:
        "Cards with visual covers, bylines, categories, dates, and reading-time metadata.",
      latestLink: "Open archive",
      newsletterEyebrow: "Editorial newsletter",
      newsletterTitle: "A weekly comics briefing shaped by judgment and context.",
      newsletterDescription:
        "This box does not subscribe you to anything real, but it adds the editorial component a digital magazine needs: a clear call-to-action, hierarchy, and a strong page close.",
      newsletterPlaceholder: "your@email.com",
      newsletterButton: "Subscribe",
      closingEyebrow: "Editorial note",
      closingTitle: "A platform designed to write about comics with visual seriousness.",
      closingBodyOne:
        "ComicVerse is not meant to read like a generic starter. Its grid, type hierarchy, and content blocks aim for the presence of a premium digital magazine.",
      closingBodyTwo:
        "The project still runs on local MDX, Next.js App Router, and Tailwind, but the visual architecture now supports categories, rankings, guides, and longform reading.",
      closingLink: "Read the editorial statement"
    },
    blog: {
      eyebrow: "Archive",
      title: "Editorial archive",
      description:
        "Essays, notes, process pieces, and recommendations arranged like a proper editorial archive.",
      searchLabel: "Search",
      searchPlaceholder: "Search by title, theme, or author",
      filter: "Filter"
    },
    categories: {
      eyebrow: "Site map",
      title: "Categories",
      description:
        "Permanent sections for exploring the archive by tone, universe, and reading style.",
      titlePrefix: "Category"
    },
    rankings: {
      eyebrow: "Curation",
      title: "Rankings",
      description:
        "Lists built like editorial packages: order, criteria, and useful entry points for where to read next."
    },
    guides: {
      eyebrow: "Editorial service",
      title: "Reading guides",
      description:
        "Paths designed for beginners and intermediate readers who want context before volume."
    },
    about: {
      eyebrow: "About ComicVerse",
      title: "An editorial project built to discuss comics with visual ambition and critical intent.",
      description:
        "ComicVerse exists to bring together visual criticism, reading guides, and curation in an interface that does not flatten the medium into a generic blog. The idea is to treat comics as culture, form, and archive.",
      missionTitle: "Mission",
      missionBody:
        "Build a space where recommendations, context, and analysis can live together inside a coherent editorial presentation.",
      toneTitle: "Tone",
      toneBody:
        "Elegant, clear, and contemporary. Closer to a cultural magazine than to a fan site or a portfolio starter.",
      whyTitle: "Why it exists",
      whyBody:
        "Because the medium deserves a platform that combines guidance for new readers with longform pieces and serious design."
    },
    footer: {
      eyebrow: "Editorial platform",
      description:
        "An editorial platform about comics, visual storytelling, and reading paths designed to build a sharper archive.",
      note:
        "Built for portfolio use, but with a visual treatment and information hierarchy closer to a digital magazine than to a starter template.",
      navigation: "Navigation",
      categories: "Categories",
      legalLeft: "ComicVerse. Editorial demo built with Next.js and local MDX.",
      legalRight: "Bilingual design with magazine tone and curated archive logic."
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
