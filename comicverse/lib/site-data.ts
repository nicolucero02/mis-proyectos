import type { LocalizedText } from "@/lib/i18n";

export type Category = {
  name: LocalizedText;
  slug: string;
  description: LocalizedText;
  eyebrow: LocalizedText;
};

export type RankingEntry = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  items: LocalizedText[];
};

export type GuideEntry = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  level: LocalizedText;
  focus: LocalizedText;
};

export type GuideSection = {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
};

export type GuideArticle = GuideEntry & {
  description: LocalizedText;
  excerpt: LocalizedText;
  cover: "amber" | "midnight" | "moss" | "rose" | "slate" | "gold";
  readingMinutes: number;
  sections: GuideSection[];
};

export type CategoryDefinition = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
};

export const siteNavigation = [
  { href: "/" },
  { href: "/blog" },
  { href: "/categorias" },
  { href: "/rankings" },
  { href: "/guias" },
  { href: "/about" }
] as const;

export const categoryMetaBySlug: Record<string, CategoryDefinition> = {
  marvel: {
    name: { es: "Marvel", en: "Marvel" },
    slug: "marvel",
    eyebrow: { es: "Universo compartido", en: "Shared universe" },
    description: {
      es: "Runs, eventos y personajes clave para leer Marvel con contexto y no solo por hype.",
      en: "Runs, events, and key characters that help readers approach Marvel with context instead of pure hype."
    }
  },
  dc: {
    name: { es: "DC", en: "DC" },
    slug: "dc",
    eyebrow: { es: "Mitos modernos", en: "Modern myths" },
    description: {
      es: "Legado, reinvenciones y lecturas donde el icono pesa tanto como la historia.",
      en: "Legacy, reinvention, and readings where the icon matters as much as the story."
    }
  },
  indie: {
    name: { es: "Indie", en: "Indie" },
    slug: "indie",
    eyebrow: { es: "Voces de autor", en: "Author voices" },
    description: {
      es: "Editoriales, autores y libros donde la identidad gráfica manda el tono.",
      en: "Publishers, creators, and books where graphic identity drives the tone."
    }
  },
  "novela-grafica": {
    name: { es: "Novela gráfica", en: "Graphic novels" },
    slug: "novela-grafica",
    eyebrow: { es: "Largo formato", en: "Long form" },
    description: {
      es: "Obras autoconclusivas con ambición literaria, estructura cuidada y peso cultural.",
      en: "Standalone works with literary ambition, deliberate structure, and broader cultural weight."
    }
  },
  "ciencia-ficcion": {
    name: { es: "Ciencia ficción", en: "Science fiction" },
    slug: "ciencia-ficcion",
    eyebrow: { es: "Mundos y sistemas", en: "Worlds and systems" },
    description: {
      es: "Series donde el worldbuilding, el diseño y la especulación sostienen la lectura.",
      en: "Comics where worldbuilding, design, and speculation carry the entire reading experience."
    }
  },
  terror: {
    name: { es: "Terror", en: "Horror" },
    slug: "terror",
    eyebrow: { es: "Tensión y textura", en: "Tension and texture" },
    description: {
      es: "Cómics donde el silencio, la sombra y el ritmo de página construyen inquietud.",
      en: "Comics where silence, shadow, and page rhythm are what generate unease."
    }
  },
  guias: {
    name: { es: "Guías", en: "Guides" },
    slug: "guias",
    eyebrow: { es: "Puertas de entrada", en: "Entry points" },
    description: {
      es: "Rutas de lectura, puntos de partida y mapas breves para entrar a universos complejos sin perder el foco.",
      en: "Reading routes, entry points, and concise maps for approaching complex comic universes without losing focus."
    }
  },
  autores: {
    name: { es: "Autores", en: "Creators" },
    slug: "autores",
    eyebrow: { es: "Firmas y trayectorias", en: "Voices and careers" },
    description: {
      es: "Perfiles, recorridos y claves para seguir a los autores que hoy definen la conversación en torno al medio.",
      en: "Profiles, careers, and reference points for following the creators shaping the current conversation around the medium."
    }
  }
};

export const categories: Category[] = Object.values(categoryMetaBySlug);

export const rankings: RankingEntry[] = [
  {
    slug: "mejores-runs-batman",
    title: {
      es: "Los runs de Batman que mejor equilibran noir, legado y accesibilidad",
      en: "The Batman runs that best balance noir, legacy, and accessibility"
    },
    summary: {
      es: "Una lista pensada para lectores que quieren una puerta de entrada fuerte sin caer en continuidad imposible.",
      en: "A shortlist for readers who want a strong entry point without getting trapped in impossible continuity."
    },
    category: { es: "DC", en: "DC" },
    items: [
      { es: "Batman: Year One", en: "Batman: Year One" },
      { es: "The Long Halloween", en: "The Long Halloween" },
      { es: "Batman and Robin de Tomasi", en: "Batman and Robin by Tomasi" },
      { es: "The Black Mirror", en: "The Black Mirror" }
    ]
  },
  {
    slug: "sagas-marvel-para-empezar",
    title: {
      es: "Las sagas Marvel que sí sirven como puerta de entrada en 2026",
      en: "The Marvel sagas that actually work as entry points in 2026"
    },
    summary: {
      es: "No todos los crossover ayudan a empezar. Estas historias sí ordenan personajes, stakes y contexto editorial.",
      en: "Not every crossover helps new readers. These stories actually organize characters, stakes, and editorial context."
    },
    category: { es: "Marvel", en: "Marvel" },
    items: [
      { es: "Annihilation", en: "Annihilation" },
      { es: "Civil War", en: "Civil War" },
      { es: "House of X / Powers of X", en: "House of X / Powers of X" },
      { es: "Ultimate Spider-Man", en: "Ultimate Spider-Man" }
    ]
  },
  {
    slug: "indies-con-mejor-identidad-visual",
    title: {
      es: "Cómics indie con una identidad visual imposible de confundir",
      en: "Indie comics with a visual identity you cannot mistake"
    },
    summary: {
      es: "Libros donde la dirección de arte no acompaña el texto: es directamente la voz principal del proyecto.",
      en: "Books where art direction does not support the text so much as become the project’s main voice."
    },
    category: { es: "Indie", en: "Indie" },
    items: [
      { es: "Black Hole", en: "Black Hole" },
      { es: "Daytripper", en: "Daytripper" },
      { es: "Monstress", en: "Monstress" },
      { es: "The Nice House on the Lake", en: "The Nice House on the Lake" }
    ]
  }
];

export const guides: GuideEntry[] = [
  {
    slug: "marvel-reading-guide",
    title: {
      es: "Cómo empezar a leer Marvel sin ahogarte en la continuidad",
      en: "How to start reading Marvel without drowning in continuity"
    },
    summary: {
      es: "Una ruta breve para entender eras, runs y puntos de entrada sin leer décadas de contexto previo.",
      en: "A compact route through eras, runs, and entry points without requiring decades of background reading."
    },
    level: { es: "Principiante", en: "Beginner" },
    focus: { es: "Marvel", en: "Marvel" }
  },
  {
    slug: "graphic-novel-entry-guide",
    title: {
      es: "Novela gráfica para lectores que llegan desde cine, series o literatura",
      en: "Graphic novels for readers arriving from film, television, or literature"
    },
    summary: {
      es: "Obras cerradas, accesibles y con peso formal para quienes prefieren libros autoconclusivos y lectura de autor.",
      en: "Self-contained works with strong formal identity for readers who prefer complete books and author-driven narratives."
    },
    level: { es: "Principiante", en: "Beginner" },
    focus: { es: "Novela gráfica", en: "Graphic novels" }
  },
  {
    slug: "horror-comics-guide",
    title: {
      es: "Una guía para leer terror en cómics según atmósfera, intensidad y dibujo",
      en: "A guide to horror comics by atmosphere, intensity, and visual style"
    },
    summary: {
      es: "Del horror psicológico al pulp oscuro, con recomendaciones según ritmo, densidad visual e impacto.",
      en: "From psychological horror to dark pulp, with recommendations based on pace, visual density, and impact."
    },
    level: { es: "Intermedio", en: "Intermediate" },
    focus: { es: "Terror", en: "Horror" }
  }
];

export const guideArticles: GuideArticle[] = [
  {
    slug: "marvel-reading-guide",
    title: {
      es: "Cómo empezar a leer Marvel sin ahogarte en la continuidad",
      en: "How to start reading Marvel without drowning in continuity"
    },
    summary: {
      es: "Una ruta breve para entender eras, runs y puntos de entrada sin leer décadas de contexto previo.",
      en: "A compact route through eras, runs, and entry points without requiring decades of background reading."
    },
    description: {
      es: "Una guía editorial extensa para construir una primera ruta Marvel con criterio, evitando la ansiedad por completarlo todo.",
      en: "A long-form editorial guide to building a first Marvel reading path with judgment, without getting trapped in total-completion anxiety."
    },
    excerpt: {
      es: "Marvel intimida cuando se lo mira como una montaña de continuidad. Esta guía propone una entrada más inteligente: leer por puertas claras, por equipos creativos sólidos y por eras que todavía explican por qué estos personajes importan.",
      en: "Marvel looks intimidating when treated like an endless mountain of continuity. This guide proposes a smarter entry: read through clear doorways, strong creative teams, and eras that still explain why these characters matter."
    },
    level: { es: "Principiante", en: "Beginner" },
    focus: { es: "Marvel", en: "Marvel" },
    cover: "gold",
    readingMinutes: 8,
    sections: [
      {
        heading: {
          es: "Dejar de pensar Marvel como una enciclopedia",
          en: "Stop thinking of Marvel as an encyclopedia"
        },
        paragraphs: [
          {
            es: "Muchos lectores nuevos miran Marvel y ven una continuidad imposible: décadas de publicaciones, cientos de personajes y eventos que parecen exigir conocimiento previo. Ese marco es paralizante porque plantea la lectura como una deuda. La primera corrección es conceptual: Marvel no se entra dominando un universo completo, sino encontrando puertas que expliquen cómo funciona una zona del mapa.",
            en: "Many new readers look at Marvel and see impossible continuity: decades of publishing, hundreds of characters, and events that seem to require prior knowledge. That frame is paralyzing because it turns reading into debt. The first correction is conceptual: you do not enter Marvel by mastering a complete universe, but by finding doors that explain how one part of the map works."
          },
          {
            es: "Una buena entrada Marvel no tiene que responderlo todo. Tiene que volver legible una lógica editorial, un tono y una relación entre personaje, mundo y stakes. Si eso aparece, el lector ya tiene orientación; lo demás puede venir después.",
            en: "A good Marvel starting point does not need to answer everything. It needs to make an editorial logic, a tone, and a relation between character, world, and stakes readable. Once that appears, the reader already has orientation; the rest can come later."
          }
        ]
      },
      {
        heading: {
          es: "Empezar por runs, no por eventos",
          en: "Start with runs, not with events"
        },
        paragraphs: [
          {
            es: "La tentación más común es arrancar por un gran crossover porque parece central. Sin embargo, los eventos suelen ser peores puertas de entrada que los runs concentrados. Un run fuerte deja que un equipo creativo establezca ritmo, secundarios, tono visual y conflicto sostenido. Un evento, en cambio, suele repartir esa energía entre demasiados títulos.",
            en: "The most common temptation is to start with a big crossover because it looks central. In practice, events are usually weaker entry points than focused runs. A strong run lets a creative team establish rhythm, supporting characters, visual tone, and sustained conflict. An event usually spreads that energy across too many titles."
          },
          {
            es: "Si quieres entender por qué un personaje funciona, conviene elegir primero una etapa con identidad. Ahí Marvel deja de sentirse como una base de datos y vuelve a sentirse como historieta.",
            en: "If you want to understand why a character works, it is better to pick a run with identity first. That is where Marvel stops feeling like a database and starts feeling like comics."
          }
        ],
        bullets: [
          {
            es: "Para Spider-Man, una puerta clásica y hospitalaria sigue siendo Ultimate Spider-Man.",
            en: "For Spider-Man, a classic and welcoming doorway remains Ultimate Spider-Man."
          },
          {
            es: "Para Daredevil, Bendis y Maleev siguen siendo una entrada moderna muy fuerte.",
            en: "For Daredevil, Bendis and Maleev remain one of the strongest modern entry points."
          },
          {
            es: "Para Fantastic Four, Hickman funciona mejor una vez que ya tienes algo de contexto del tono familiar y cósmico.",
            en: "For Fantastic Four, Hickman works better once you already have some sense of the family-and-cosmic register."
          }
        ]
      },
      {
        heading: {
          es: "Tres rutas de entrada que sí ordenan",
          en: "Three entry routes that actually organize the line"
        },
        paragraphs: [
          {
            es: "La primera ruta posible es entrar por personaje. Si te interesan héroes concretos, conviene buscar una etapa reconocida y relativamente autónoma. Eso vale para Daredevil, Hawkeye, Thor o Ms. Marvel. La ventaja de este camino es que construye vínculo emocional rápido.",
            en: "The first route is to enter by character. If you care about specific heroes, look for a highly regarded and relatively self-contained run. That works for Daredevil, Hawkeye, Thor, or Ms. Marvel. The advantage of this path is that it creates emotional investment quickly."
          },
          {
            es: "La segunda es entrar por línea conceptual. Si te atrae lo cósmico, puedes ir hacia Annihilation o el bloque moderno de los Guardianes. Si te interesa lo mutante, un buen eje es New X-Men seguido por Astonishing X-Men, antes de saltar a House of X / Powers of X. Esta ruta enseña que Marvel está compuesta por subecosistemas con lógicas distintas.",
            en: "The second is to enter by conceptual line. If you are drawn to cosmic Marvel, you can move toward Annihilation or the modern Guardians material. If you care about mutant books, a strong axis is New X-Men followed by Astonishing X-Men before jumping to House of X / Powers of X. This route teaches that Marvel is made of sub-ecosystems with different internal logics."
          },
          {
            es: "La tercera es entrar por autor. Seguir una firma como Al Ewing, Jonathan Hickman, Kelly Thompson o Chip Zdarsky puede ser más útil que seguir una marca abstracta. En Marvel, la autoría importa más de lo que la maquinaria compartida deja ver a primera vista.",
            en: "The third is to enter by creator. Following a voice like Al Ewing, Jonathan Hickman, Kelly Thompson, or Chip Zdarsky can be more useful than following an abstract brand. In Marvel, authorship matters more than the shared machine suggests at first glance."
          }
        ]
      },
      {
        heading: {
          es: "Qué conviene evitar al principio",
          en: "What to avoid at the beginning"
        },
        paragraphs: [
          {
            es: "Hay tres trampas bastante previsibles. La primera es la ansiedad por el orden total. La segunda es empezar por eventos recientes solo porque son recientes. La tercera es leer demasiado rápido y sin repetición de equipos creativos. Las tres prácticas vuelven el archivo más ruidoso de lo que realmente es.",
            en: "There are three predictable traps. The first is total-order anxiety. The second is starting with recent events only because they are recent. The third is reading too fast without staying with the same creative teams. All three make the archive noisier than it actually is."
          },
          {
            es: "Marvel se entiende mejor cuando se le concede continuidad a una mirada. Si cada tomo cambia de personaje, época y tono, lo único que queda es escala. Y la escala, por sí sola, rara vez crea apego.",
            en: "Marvel becomes easier to understand when you give continuity to one perspective. If every volume changes character, era, and tone, all that remains is scale. And scale on its own rarely creates attachment."
          }
        ]
      },
      {
        heading: {
          es: "Una primera biblioteca Marvel que vale la pena",
          en: "A first Marvel shelf worth building"
        },
        paragraphs: [
          {
            es: "Si hubiera que recomendar una primera mini-biblioteca, sería algo así: Ultimate Spider-Man para accesibilidad, Daredevil de Bendis para noir urbano, Hawkeye de Fraction para ritmo y diseño, Ms. Marvel de Wilson para claridad de personaje, y House of X / Powers of X como muestra de reinvención editorial de gran escala.",
            en: "If I had to recommend a first mini-library, it would look something like this: Ultimate Spider-Man for accessibility, Bendis’s Daredevil for urban noir, Fraction’s Hawkeye for rhythm and design, Wilson’s Ms. Marvel for character clarity, and House of X / Powers of X as a demonstration of large-scale editorial reinvention."
          },
          {
            es: "Ese pequeño conjunto no pretende cubrir Marvel. Hace algo más útil: muestra cinco maneras distintas en que Marvel puede ser bueno. Y para un lector nuevo, eso vale más que cualquier checklist infinito.",
            en: "That small set does not pretend to cover Marvel. It does something more useful: it shows five different ways Marvel can be good. For a new reader, that matters more than any endless checklist."
          }
        ]
      }
    ]
  },
  {
    slug: "graphic-novel-entry-guide",
    title: {
      es: "Novela gráfica para lectores que llegan desde cine, series o literatura",
      en: "Graphic novels for readers arriving from film, television, or literature"
    },
    summary: {
      es: "Obras cerradas, accesibles y con peso formal para quienes prefieren libros autoconclusivos y lectura de autor.",
      en: "Self-contained works with strong formal identity for readers who prefer complete books and author-driven narratives."
    },
    description: {
      es: "Una guía larga para entrar a la novela gráfica sin pasar por continuidad ni por la idea de que el cómic requiere contexto previo para leerse bien.",
      en: "A long-form guide to entering graphic novels without going through continuity, and without assuming comics require prior context to be read well."
    },
    excerpt: {
      es: "Para muchos lectores, la novela gráfica es la forma más hospitalaria de entrar al cómic: libros completos, autoría visible y una lectura que no depende de franquicias. Esta guía ordena por sensibilidad, no por canon.",
      en: "For many readers, the graphic novel is the most hospitable way into comics: complete books, visible authorship, and reading that does not depend on franchises. This guide organizes by sensibility, not by canon."
    },
    level: { es: "Principiante", en: "Beginner" },
    focus: { es: "Novela gráfica", en: "Graphic novels" },
    cover: "amber",
    readingMinutes: 8,
    sections: [
      {
        heading: {
          es: "Por qué la novela gráfica suele ser la mejor puerta de entrada",
          en: "Why graphic novels are often the best entry point"
        },
        paragraphs: [
          {
            es: "Muchos lectores ajenos al cómic no necesitan más universo: necesitan mejor forma. La novela gráfica ofrece justamente eso. Un libro completo, una estructura cerrada, una voz reconocible y un compromiso menor con la ansiedad de continuidad. Para quien llega desde la literatura, el cine o las series, esa unidad importa mucho.",
            en: "Many readers coming from outside comics do not need more universe: they need better form. Graphic novels offer exactly that. A complete book, a closed structure, a recognizable voice, and far less continuity anxiety. For readers arriving from literature, film, or television, that unity matters a lot."
          },
          {
            es: "La ventaja no es solo práctica. También es estética. Un libro autoconclusivo permite percibir cómo el medio piensa en ritmo, composición y silencios a escala de obra completa. La lectura deja de sentirse como tramo y pasa a sentirse como experiencia.",
            en: "The advantage is not only practical. It is aesthetic too. A self-contained book lets you perceive how the medium thinks in rhythm, composition, and silence at the scale of a complete work. Reading stops feeling like a fragment and starts feeling like an experience."
          }
        ]
      },
      {
        heading: {
          es: "Entrar por sensibilidad, no por prestigio abstracto",
          en: "Enter by sensibility, not by abstract prestige"
        },
        paragraphs: [
          {
            es: "Uno de los errores más comunes al recomendar novela gráfica es confundir respeto crítico con ajuste lector. No todo libro consagrado sirve igual para cualquiera. Quien viene de ficción literaria puede responder mejor a la precisión emocional de Daytripper o Fun Home; quien viene del cine puede conectar antes con un libro visualmente más directo o con una construcción escénica más evidente.",
            en: "One of the most common mistakes in recommending graphic novels is confusing critical prestige with reader fit. Not every celebrated book works equally well for everyone. A reader coming from literary fiction may respond better to the emotional precision of Daytripper or Fun Home; a reader coming from film may connect more quickly with a visually direct book or one with clearer scene construction."
          },
          {
            es: "La pregunta correcta no es solo cuál es el libro más importante, sino cuál vuelve más visible por qué el cómic es un medio singular para ese lector concreto.",
            en: "The right question is not only which book is most important, but which one makes it easiest for this specific reader to see why comics are a singular medium."
          }
        ]
      },
      {
        heading: {
          es: "Tres recorridos posibles para un lector nuevo",
          en: "Three possible paths for a new reader"
        },
        paragraphs: [
          {
            es: "El primer recorrido es el de la novela gráfica literaria: libros donde la estructura, la voz y la observación de personajes se sienten cercanas a la tradición del libro. Aquí entran Asterios Polyp, Fun Home, Sabrina o Daytripper. Son obras que enseñan rápido cómo una página puede pensar tanto como una frase.",
            en: "The first path is the literary graphic novel: books in which structure, voice, and character observation feel close to the tradition of literary fiction. Here you get Asterios Polyp, Fun Home, Sabrina, or Daytripper. These books quickly teach how a page can think as much as a sentence."
          },
          {
            es: "El segundo recorrido es el de la memoria gráfica y la no ficción, donde el lector encuentra contexto emocional inmediato. Persepolis, The Best We Could Do o Ducks son ejemplos de obras donde el cómic organiza recuerdo, política y experiencia vivida con una inteligencia que no depende de familiaridad previa con el medio.",
            en: "The second path is graphic memoir and nonfiction, where the reader finds immediate emotional context. Persepolis, The Best We Could Do, or Ducks are examples of works in which comics organize memory, politics, and lived experience with an intelligence that does not depend on prior familiarity with the medium."
          },
          {
            es: "El tercer recorrido es el del género autoral: libros que siguen siendo hospitalarios aunque trabajen ciencia ficción, fantasía o thriller. Monstress, Black Hole, Blankets o Nimona pueden funcionar muy bien si el lector quiere una identidad gráfica fuerte sin entrar todavía en la lógica serial del mainstream.",
            en: "The third path is creator-driven genre: books that remain welcoming even when they work in science fiction, fantasy, or thriller. Monstress, Black Hole, Blankets, or Nimona can work very well if the reader wants a strong graphic identity without entering the serial logic of the mainstream yet."
          }
        ]
      },
      {
        heading: {
          es: "Cómo leer una novela gráfica con más provecho",
          en: "How to read a graphic novel with more payoff"
        },
        paragraphs: [
          {
            es: "La mejor forma de leer novela gráfica por primera vez no es correr hacia la trama. Conviene prestar atención a cómo la página regula la velocidad, qué paneles repite, dónde se ensancha el tiempo y cuándo el silencio carga más que el texto. Eso que en un comienzo parece solo estilo suele ser parte del sentido.",
            en: "The best way to read a graphic novel for the first time is not to rush toward plot. It helps to watch how the page regulates speed, which panels it repeats, where time expands, and when silence carries more than text. What may first look like style is often part of meaning."
          },
          {
            es: "En otras palabras: no hace falta saber teoría del cómic para leer bien, pero sí conviene darse permiso para leer la página y no solo los acontecimientos.",
            en: "In other words: you do not need comics theory to read well, but it does help to give yourself permission to read the page, not only the events."
          }
        ]
      },
      {
        heading: {
          es: "Una pequeña biblioteca inicial",
          en: "A small starter library"
        },
        paragraphs: [
          {
            es: "Si hubiera que armar una primera biblioteca breve, incluiría cinco títulos: Daytripper por su claridad emocional, Fun Home por su densidad y precisión, Asterios Polyp por su inteligencia formal, Persepolis por su hospitalidad narrativa y Sabrina por su manera contemporánea de construir distancia y desasosiego.",
            en: "If I had to build a short starter shelf, I would include five titles: Daytripper for emotional clarity, Fun Home for density and precision, Asterios Polyp for formal intelligence, Persepolis for narrative hospitality, and Sabrina for its contemporary way of building distance and unease."
          },
          {
            es: "Ninguno de esos libros agota la novela gráfica. Pero juntos hacen algo mejor: le muestran a un lector nuevo que el cómic puede ser íntimo, estructuralmente ambicioso y visualmente preciso sin pedirle años de aprendizaje previo.",
            en: "None of these books exhausts the category of the graphic novel. Together they do something better: they show a new reader that comics can be intimate, structurally ambitious, and visually precise without asking for years of prior training."
          }
        ]
      }
    ]
  },
  {
    slug: "horror-comics-guide",
    title: {
      es: "Una guía para leer terror en cómics según atmósfera, intensidad y dibujo",
      en: "A guide to horror comics by atmosphere, intensity, and visual style"
    },
    summary: {
      es: "Del horror psicológico al pulp oscuro, con recomendaciones según ritmo, densidad visual e impacto.",
      en: "From psychological horror to dark pulp, with recommendations based on pace, visual density, and impact."
    },
    description: {
      es: "Una guía editorial larga para orientarse en el terror en cómics sin reducir el género a monstruos o sustos, sino leyendo por ritmo, ambiente y puesta en página.",
      en: "A long-form editorial guide to horror comics that avoids reducing the genre to monsters or jump scares, and instead reads by rhythm, atmosphere, and page construction."
    },
    excerpt: {
      es: "Leer terror en cómics no consiste solo en elegir el monstruo correcto. El género cambia por completo según atmósfera, silencios, densidad visual y violencia explícita. Esta guía organiza ese mapa para que la entrada sea más fina.",
      en: "Reading horror comics is not only about choosing the right monster. The genre changes completely depending on atmosphere, silence, visual density, and explicit violence. This guide organizes that map so the entry point can be more precise."
    },
    level: { es: "Intermedio", en: "Intermediate" },
    focus: { es: "Terror", en: "Horror" },
    cover: "rose",
    readingMinutes: 8,
    sections: [
      {
        heading: {
          es: "Por qué conviene ordenar el terror por experiencia y no por monstruo",
          en: "Why horror is better organized by experience than by monster"
        },
        paragraphs: [
          {
            es: "Cuando alguien pide recomendaciones de terror, la conversación tiende a girar enseguida hacia el concepto: fantasmas, folk horror, body horror, casas embrujadas. Esa clasificación sirve hasta cierto punto, pero no alcanza para orientar una lectura. En cómics, la diferencia más importante muchas veces no es qué amenaza aparece, sino cómo la página administra el miedo.",
            en: "When someone asks for horror recommendations, the conversation quickly turns toward concept: ghosts, folk horror, body horror, haunted houses. That classification helps up to a point, but it is not enough to orient reading. In comics, the most important difference is often not what threat appears, but how the page manages fear."
          },
          {
            es: "Dos cómics con fantasmas pueden sentirse radicalmente distintos si uno trabaja desde el silencio y el otro desde el shock visual. Por eso vale más ordenar el género por experiencia: inquietud lenta, asfixia, violencia gráfica, rareza surreal, melancolía o paranoia.",
            en: "Two ghost comics can feel radically different if one works through silence and the other through visual shock. That is why it is more useful to organize the genre by experience: slow unease, claustrophobia, graphic violence, surreal strangeness, melancholy, or paranoia."
          }
        ]
      },
      {
        heading: {
          es: "Una primera distinción: terror atmosférico vs terror de impacto",
          en: "A first distinction: atmospheric horror vs impact horror"
        },
        paragraphs: [
          {
            es: "El terror atmosférico es el más propio del cómic. Vive de la espera, del page turn, del espacio vacío y de la repetición. Harrow County, The Nice House on the Lake o ciertas zonas de Gideon Falls construyen inquietud porque la página se demora y deja que el ambiente gane agencia.",
            en: "Atmospheric horror is the mode most native to comics. It lives through waiting, page turns, empty space, and repetition. Harrow County, The Nice House on the Lake, or parts of Gideon Falls build unease because the page delays and allows the environment to gain agency."
          },
          {
            es: "El terror de impacto, en cambio, depende más de la revelación, de la deformación corporal o de la sorpresa gráfica. Puede ser potentísimo, pero exige otro umbral de tolerancia visual. Si un lector entra por el costado incorrecto, corre el riesgo de creer que el género no es para él cuando quizá solo empezó por el registro equivocado.",
            en: "Impact horror, by contrast, depends more on revelation, bodily distortion, or graphic surprise. It can be powerful, but it demands a different threshold for visual intensity. If a reader enters through the wrong side of that divide, they may wrongly conclude the genre is not for them when in fact they simply started in the wrong register."
          }
        ]
      },
      {
        heading: {
          es: "Cómo usar el dibujo como criterio de entrada",
          en: "How to use drawing as an entry criterion"
        },
        paragraphs: [
          {
            es: "En terror, el estilo gráfico no es una capa secundaria. Decide cuánto pesa la sombra, qué grado de detalle tiene un cuerpo, cuánto se entiende un espacio y cuán literal o abstracta se vuelve la amenaza. Por eso conviene elegir libros también por dibujo.",
            en: "In horror, graphic style is not a secondary layer. It decides how much weight shadows carry, how much detail a body holds, how readable a space remains, and how literal or abstract the threat becomes. That is why it helps to choose books by drawing style as well."
          },
          {
            es: "Hay lectores que responden mejor a líneas limpias con color controlado, porque la claridad vuelve más inquietante la ruptura. Otros prefieren trazos sucios y manchas densas, donde el miedo ya está presente antes de que aparezca el monstruo. No es una cuestión de superioridad, sino de umbral y preferencia.",
            en: "Some readers respond better to clean lines and controlled color because clarity makes the rupture more disturbing. Others prefer rough marks and dense textures where fear is already present before the monster arrives. It is not about superiority; it is about threshold and preference."
          }
        ]
      },
      {
        heading: {
          es: "Tres rutas concretas para entrar al género",
          en: "Three concrete entry routes into the genre"
        },
        paragraphs: [
          {
            es: "Si buscas terror atmosférico y hospitalario, una ruta muy sólida pasa por Harrow County, Through the Woods y The Nice House on the Lake. Son libros donde el miedo se construye desde clima, composición y silencios más que desde saturación explícita.",
            en: "If you want atmospheric and welcoming horror, a strong route runs through Harrow County, Through the Woods, and The Nice House on the Lake. These are books where fear is built through climate, composition, and silence more than through explicit saturation."
          },
          {
            es: "Si prefieres un terror más raro y contemporáneo, Gideon Falls, Black Hole o ciertos trabajos de Emily Carroll ofrecen una mezcla de incomodidad visual, extrañeza y ritmo quebrado que vuelve el género más imprevisible.",
            en: "If you prefer stranger, more contemporary horror, Gideon Falls, Black Hole, or selected work by Emily Carroll offer a mix of visual discomfort, strangeness, and broken rhythm that makes the genre less predictable."
          },
          {
            es: "Si tu interés va por el horror más físico o extremo, conviene entrar con cautela y sabiendo que el cuerpo se vuelve centro de la experiencia. Allí el dibujo y el nivel de explicitud importan todavía más.",
            en: "If your interest leans toward more physical or extreme horror, it helps to enter with caution and to know that the body becomes the center of the experience. In that lane, drawing style and explicitness matter even more."
          }
        ]
      },
      {
        heading: {
          es: "Leer terror mejor",
          en: "How to read horror better"
        },
        paragraphs: [
          {
            es: "Una buena lectura de terror no debería quedarse en si el cómic “da miedo” o no. Conviene preguntarse otra cosa: ¿qué tipo de tensión administra? ¿Cómo mide la espera? ¿Qué hace con la oscuridad, con la página muda, con la repetición? Ahí el género se vuelve más interesante.",
            en: "A good reading of horror should not stop at whether the comic is simply “scary” or not. It helps to ask something else: what kind of tension does it manage? How does it measure waiting? What does it do with darkness, silent pages, or repetition? That is where the genre becomes more interesting."
          },
          {
            es: "El terror en cómics recompensa mucho a quien presta atención al tiempo. No solo a lo que aparece, sino a cuánto tarda en aparecer. Si se lee así, el mapa del género se vuelve bastante más rico que una simple lista de monstruos.",
            en: "Horror comics reward readers who pay attention to time. Not only to what appears, but to how long it takes to appear. Read that way, the genre map becomes much richer than a simple list of monsters."
          }
        ]
      }
    ]
  }
];
