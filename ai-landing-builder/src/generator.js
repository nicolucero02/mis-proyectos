const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

export const OPTIONS = {
  es: {
    industries: [
      'Tecnología', 'Salud', 'Educación', 'E-commerce', 'Finanzas',
      'Marketing', 'Consultoría', 'Inmobiliaria', 'Alimentación',
      'Fitness', 'Legal', 'Otro',
    ],
    audiences: [
      'Pequeñas empresas', 'Freelancers', 'Startups', 'Grandes empresas',
      'Consumidores finales', 'Profesionales', 'Estudiantes', 'Emprendedores',
    ],
    businessTypes: [
      { key: 'b2c', label: 'B2C — Venta directa al consumidor' },
      { key: 'b2b', label: 'B2B — Servicios para empresas' },
      { key: 'saas', label: 'SaaS — Producto de software' },
    ],
  },
  en: {
    industries: [
      'Technology', 'Health', 'Education', 'E-commerce', 'Finance',
      'Marketing', 'Consulting', 'Real Estate', 'Food & Beverage',
      'Fitness', 'Legal', 'Other',
    ],
    audiences: [
      'Small businesses', 'Freelancers', 'Startups', 'Enterprise',
      'Consumers', 'Professionals', 'Students', 'Entrepreneurs',
    ],
    businessTypes: [
      { key: 'b2c', label: 'B2C — Direct to consumer' },
      { key: 'b2b', label: 'B2B — Services for companies' },
      { key: 'saas', label: 'SaaS — Software product' },
    ],
  },
};

/* ── helpers ── */
const b2cCTAs = {
  es: [
    'Empieza tu transformación hoy',
    'Reserva tu lugar ahora',
    'Pruébalo sin compromiso',
    'Descubre lo que puedes lograr',
    'Únete a miles de clientes felices',
    'Empieza gratis — 14 días',
  ],
  en: [
    'Start your transformation today',
    'Book your spot now',
    'Try it risk-free',
    'Discover what you can achieve',
    'Join thousands of happy customers',
    'Start free — 14 days',
  ],
};

const b2bCTAs = {
  es: [
    'Solicitar demo personalizada',
    'Calcular tu ROI en 2 minutos',
    'Agendar llamada con especialistas',
    'Ver casos de éxito',
    'Empezar prueba para empresas',
  ],
  en: [
    'Request a personalized demo',
    'Calculate your ROI in 2 minutes',
    'Book a call with specialists',
    'See success stories',
    'Start a business trial',
  ],
};

const saasCTAs = {
  es: [
    'Comenzar prueba gratuita',
    'Ver documentación de la API',
    'Integrar en minutos',
    'Desplegar ahora',
    'Probar sandbox gratis',
  ],
  en: [
    'Start free trial',
    'View API documentation',
    'Integrate in minutes',
    'Deploy now',
    'Try the free sandbox',
  ],
};

function pick(arr, seed) {
  return arr[seed % arr.length];
}

/* ── B2C templates ── */
const B2C = {
  es: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: el ${industry} que transforma tu día a día`,
        subhero: (audience, benefit) =>
          `Diseñado para ${audience} que buscan resultados reales. ${cap(benefit)} con un servicio profesional que se adapta a tu ritmo de vida.`,
        features: [
          (b) => `Resultados visibles desde la primera semana`,
          () => `Atención personalizada en cada paso`,
          () => `Flexibilidad total para tu agenda`,
        ],
        featureDescs: [
          'Nota la diferencia rápidamente, sin esperas ni complicaciones.',
          'Un equipo dedicado que entiende tus objetivos y te guía.',
          'Reserva, cancela o modifica cuando quieras. Sin letra pequeña.',
        ],
        social: {
          quote: 'Cambié mi rutina por completo. En un mes noté una diferencia enorme en mi energía y confianza.',
          author: '— Cliente desde hace 6 meses',
        },
        faq: [
          { q: '¿Necesito experiencia previa?', a: 'Para nada. Nuestro equipo te acompaña desde el primer día, sin importar tu nivel.' },
          { q: '¿Puedo probar antes de comprometerme?', a: 'Sí. Primera sesión o clase de prueba gratuita. Sin tarjeta de crédito.' },
          { q: '¿Qué pasa si no tengo mucho tiempo?', a: 'Planes flexibles desde 20 minutos. Nos adaptamos a tu agenda, no al revés.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Descubre lo mejor de ${industry} con ${name}`,
        subhero: (audience, benefit) =>
          `Para ${audience} que valoran la calidad y los resultados. ${cap(benefit)} con un estándar que marca la diferencia.`,
        features: [
          () => `Calidad validada por miles de clientes`,
          () => `Proceso simple, sin trámites`,
          () => `Garantía de satisfacción`,
        ],
        featureDescs: [
          'Miles de reseñas positivas respaldan cada servicio que ofrecemos.',
          'Reserva en 3 clics. Sin formularios eternos ni confirmaciones por teléfono.',
          'Si no estás satisfecho, te devolvemos tu dinero. Sin preguntas.',
        ],
        social: {
          quote: 'La mejor decisión que tomé este año. El servicio es impecable y los resultados, reales.',
          author: '— Cliente habitual',
        },
        faq: [
          { q: '¿Cuánto tiempo hasta ver resultados?', a: 'La mayoría de clientes nota mejoras en las primeras 2 semanas.' },
          { q: '¿Es seguro?', a: 'Cumplimos con todos los estándares de calidad y seguridad del sector.' },
          { q: '¿Hay planes familiares?', a: 'Sí. Descuentos especiales para familias y grupos de amigos.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: donde ${industry} se siente diferente`,
        subhero: (audience, benefit) =>
          `Pensado para ${audience} que se cansaron de lo ordinario. ${cap(benefit)} en un entorno diseñado para tu bienestar.`,
        features: [
          () => `Ambiente diseñado para tu comodidad`,
          () => `Profesionales certificados`,
          () => `Comunidad que te impulsa`,
        ],
        featureDescs: [
          'Cada detalle está pensado para que tu experiencia sea excepcional.',
          'Equipo con certificaciones internacionales y años de experiencia.',
          'Conecta con personas que comparten tus metas y te motivan a seguir.',
        ],
        social: {
          quote: 'No es solo un servicio, es una experiencia. Salgo renovada después de cada visita.',
          author: '— Miembro desde 2023',
        },
        faq: [
          { q: '¿Necesito traer algo?', a: 'Todo lo necesario está incluido. Solo trae ganas de disfrutar.' },
          { q: '¿Hay estacionamiento?', a: 'Sí, estacionamiento gratuito para clientes en todas nuestras ubicaciones.' },
          { q: '¿Puedo regalar una experiencia?', a: 'Claro. Tenemos gift cards digitales disponibles al instante.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `Con ${name}, ${industry} es más fácil de lo que piensas`,
        subhero: (audience, benefit) =>
          `Hecho para ${audience} que quieren resultados sin complicaciones. ${cap(benefit)} de forma simple y divertida.`,
        features: [
          () => `Empieza en minutos, no en semanas`,
          () => `Acompañamiento que se siente humano`,
          () => `Precios claros, sin sorpresas`,
        ],
        featureDescs: [
          'Regístrate hoy y empieza a disfrutar los beneficios de inmediato.',
          'Nuestro equipo responde en minutos y habla tu idioma. Sin robots.',
          'Sabes exactamente cuánto pagas antes de confirmar. Sin cargos ocultos.',
        ],
        social: {
          quote: 'Pensé que sería complicado. Fue tan fácil que ya recomendé a toda mi familia.',
          author: '— Cliente nuevo',
        },
        faq: [
          { q: '¿Es difícil empezar?', a: 'Para nada. En 3 pasos estás adentro. Y si tienes dudas, te ayudamos en el acto.' },
          { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Sin contratos, sin penalizaciones. Tu libertad es nuestra prioridad.' },
          { q: '¿Hay descuentos para nuevos clientes?', a: 'Sí, 20% de descuento en tu primera compra o suscripción.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: el ${industry} que se adapta a ti`,
        subhero: (audience, benefit) =>
          `Para ${audience} con vida ocupada. ${cap(benefit)} cuando y donde te funcione mejor.`,
        features: [
          () => `Horarios que se ajustan a tu rutina`,
          () => `Sin filas ni esperas`,
          () => `Resultados que se notan`,
        ],
        featureDescs: [
          'Abierto temprano, tarde y fines de semana. Tú eliges el horario.',
          'Reserva tu espacio con anticipación y llega directo a disfrutar.',
          'Clientes que vuelven porque realmente funcionó para ellos.',
        ],
        social: {
          quote: 'Con mi agenda loca, pensé que no podría. Pero se adaptó perfecto a mis horarios.',
          author: '— Profesional con agenda compleja',
        },
        faq: [
          { q: '¿Qué pasa si llego tarde?', a: 'Tienes 10 minutos de tolerancia. Después, reagendamos sin costo.' },
          { q: '¿Necesito membresía?', a: 'No obligatoria. Puedes pagar por uso o elegir un plan que se ajuste a ti.' },
          { q: '¿Ofrecen servicio a domicilio?', a: 'En zonas seleccionadas, sí. Consulta disponibilidad en tu código postal.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Tu momento de ${industry} empieza con ${name}`,
        subhero: (audience, benefit) =>
          `Para ${audience} que merecen un respiro. ${cap(benefit)} mientras cuidas de ti mismo.`,
        features: [
          () => `Experiencia relajante desde la entrada`,
          () => `Productos de la más alta calidad`,
          () => `Ambiente pensado en tu bienestar`,
        ],
        featureDescs: [
          'Desde que cruzas la puerta, todo está preparado para que te sientas en paz.',
          'Trabajamos solo con marcas premium y productos certificados.',
          'Iluminación, música y aromas cuidadosamente seleccionados para tu confort.',
        ],
        social: {
          quote: 'Es mi ritual semanal. Dos horas solo para mí que cambian mi semana completa.',
          author: '— Clienta fiel desde 2022',
        },
        faq: [
          { q: '¿Puedo ir sin cita previa?', a: 'Sí, aceptamos walk-ins según disponibilidad. Aunque recomendamos reservar.' },
          { q: '¿Hay opciones para regalos?', a: 'Gift cards físicas y digitales, listas para enviar al instante.' },
          { q: '¿Es apto para principiantes?', a: 'Totalmente. Nuestro equipo adapta la experiencia a tu nivel de comodidad.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `Olvídate de lo ordinario. ${name} redefine ${industry}`,
        subhero: (audience, benefit) =>
          `Para ${audience} que no se conforman con lo mediocre. ${cap(benefit)} con una experiencia que marca la diferencia.`,
        features: [
          () => `Resultados que la competencia no puede igualar`,
          () => `Tecnología de punta al servicio de tu bienestar`,
          () => `Clientes que vuelven una y otra vez`,
        ],
        featureDescs: [
          'Métricas comprobadas que demuestran por qué somos líderes en el sector.',
          'Equipamiento de última generación y técnicas innovadoras.',
          '95% de clientes renuevan después del primer mes. Eso dice todo.',
        ],
        social: {
          quote: 'Probé 5 lugares antes. Ninguno se acerca. Esto es otro nivel.',
          author: '— Cliente exigente',
        },
        faq: [
          { q: '¿Por qué son mejores que la competencia?', a: 'Invertimos el triple en formación y equipamiento. Los resultados hablan solos.' },
          { q: '¿Vale la pena el precio?', a: 'Nuestros clientes reportan un valor percibido 3× superior al precio pagado.' },
          { q: '¿Hay lista de espera?', a: 'Para horarios pico, recomendamos reservar con 48h de anticipación.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: el secreto de quienes ya lo lograron`,
        subhero: (audience, benefit) =>
          `Únete a ${audience} que ya descubrieron la diferencia. ${cap(benefit)} sin excusas ni atajos.`,
        features: [
          () => `Método probado por miles`,
          () => `Resultados garantizados o te devolvemos tu dinero`,
          () => `Acceso exclusivo a la comunidad`,
        ],
        featureDescs: [
          'Un proceso refinado durante años con miles de casos de éxito.',
          'Si no ves resultados en 30 días, reembolso completo. Sin letra pequeña.',
          'Eventos exclusivos, contenido premium y networking con personas ambiciosas.',
        ],
        social: {
          quote: 'En 90 días transformé algo que intenté durante años. La clave estaba en el método.',
          author: '— Cliente que alcanzó su meta',
        },
        faq: [
          { q: '¿Cuánto dura el programa?', a: 'Planes desde 4 semanas hasta 12 meses, según tu objetivo.' },
          { q: '¿Necesito compromiso total?', a: 'Recomendamos consistencia, pero adaptamos el ritmo a tu realidad.' },
          { q: '¿Qué pasa después de terminar?', a: 'Acceso de por vida a la comunidad y descuentos especiales de mantenimiento.' },
        ],
      },
      {
        hero: (name, industry) =>
          `No es para todos. ${name} es para quienes quieren ${industry} de verdad`,
        subhero: (audience, benefit) =>
          `Si eres ${audience} con ambición, esto es para ti. ${cap(benefit)} con un estándar que pocos alcanzan.`,
        features: [
          () => `Exclusividad que se nota`,
          () => `Atención 1-a-1 con expertos`,
          () => `Resultados que impresionan`,
        ],
        featureDescs: [
          'Cupos limitados para mantener la calidad que nuestros clientes esperan.',
          'No grupos masivos. Tu propio especialista dedicado a tu progreso.',
          'Cambios visibles y medibles que notarás tú y quienes te rodean.',
        ],
        social: {
          quote: 'La inversión más inteligente que hice en mí mismo. Los resultados superaron mis expectativas.',
          author: '— Emprendedor de alto rendimiento',
        },
        faq: [
          { q: '¿Por qué limitan los cupos?', a: 'Preferimos calidad sobre cantidad. Cada cliente merece atención de primer nivel.' },
          { q: '¿Es realmente 1-a-1?', a: 'Sí. Sesiones individuales con profesionales certificados, no asistentes.' },
          { q: '¿Cuál es el siguiente paso?', a: 'Agenda una evaluación gratuita. Evaluamos tus metas y diseñamos tu plan.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, sin complicaciones.`,
        subhero: (audience, benefit) =>
          `Para ${audience} que valoran la simpleza. ${cap(benefit)} con un proceso claro y directo.`,
        features: [
          () => `Reserva en 2 clics`,
          () => `Sin contratos ni letra pequeña`,
          () => `Solo pagas por lo que usas`,
        ],
        featureDescs: [
          'Entra, elige tu servicio, confirma. Listo en menos de un minuto.',
          'Usa cuando quieras. Sin compromisos ni penalizaciones por cancelar.',
          'Precios transparentes. Sin membresías obligatorias ni cargos sorpresa.',
        ],
        social: {
          quote: 'Lo que necesitaba: simple, rápido y efectivo. Sin rodeos.',
          author: '— Cliente directo',
        },
        faq: [
          { q: '¿Necesito registrarme?', a: 'Solo email y teléfono. En 30 segundos estás listo.' },
          { q: '¿Hay app móvil?', a: 'Sí. Disponible para iOS y Android. Reserva desde cualquier lugar.' },
          { q: '¿Qué métodos de pago aceptan?', a: 'Tarjeta, transferencia, efectivo y wallets digitales.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: lo esencial de ${industry}`,
        subhero: (audience, benefit) =>
          `Para ${audience} que no quieren distracciones. ${cap(benefit)} con solo lo que realmente importa.`,
        features: [
          () => `Sin funciones que no usarás`,
          () => `Calidad constante`,
          () => `Acceso inmediato`,
        ],
        featureDescs: [
          'Nada de menús confusos ni opciones innecesarias. Solo lo que necesitas.',
          'El mismo alto estándar en cada visita, sin excepciones.',
          'Sin esperas, sin procesos largos. Entra y empieza de inmediato.',
        ],
        social: {
          quote: 'Finalmente algo que no intenta venderme cosas que no necesito. Solo funciona.',
          author: '— Cliente pragmático',
        },
        faq: [
          { q: '¿Incluye extras?', a: 'Opcionales y claramente marcados. Nada oculto en letra pequeña.' },
          { q: '¿Puedo pausar mi plan?', a: 'Sí. Congela tu plan hasta por 3 meses sin perder beneficios.' },
          { q: '¿Hay soporte?', a: 'Email y chat. Respuesta en menos de 4 horas en horario laboral.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: tu espacio de ${industry}`,
        subhero: (audience, benefit) =>
          `Para ${audience} que buscan consistencia. ${cap(benefit)} en un lugar donde te sientes en casa.`,
        features: [
          () => `Ambiente familiar y acogedor`,
          () => `Horarios amplios`,
          () => `Precio justo`,
        ],
        featureDescs: [
          'Un espacio diseñado para que te sientas cómodo desde la primera visita.',
          'Abierto cuando más lo necesitas, incluyendo fines de semana.',
          'Calidad premium a precios accesibles. Sin sacrificar nada.',
        ],
        social: {
          quote: 'Voy cada semana porque se siente como mi lugar. El equipo me conoce por mi nombre.',
          author: '— Clienta de larga data',
        },
        faq: [
          { q: '¿Aceptan mascotas?', a: 'Depende de la ubicación. Consulta en tu sucursal más cercana.' },
          { q: '¿Hay estacionamiento?', a: 'Sí, gratuito en la mayoría de ubicaciones.' },
          { q: '¿Puedo traer acompañante?', a: 'Sí, áreas de espera cómodas disponibles para acompañantes.' },
        ],
      },
    ],
  },
  en: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: the ${industry} experience that transforms your daily life`,
        subhero: (audience, benefit) =>
          `Designed for ${audience} who seek real results. ${cap(benefit)} with a professional service that fits your lifestyle.`,
        features: [
          () => `Visible results from week one`,
          () => `Personalized attention every step of the way`,
          () => `Total flexibility for your schedule`,
        ],
        featureDescs: [
          'Notice the difference quickly, without waiting or complications.',
          'A dedicated team that understands your goals and guides you.',
          'Book, cancel, or modify anytime. No fine print.',
        ],
        social: {
          quote: 'I completely changed my routine. In a month I noticed a huge difference in my energy and confidence.',
          author: '— Client for 6 months',
        },
        faq: [
          { q: 'Do I need prior experience?', a: 'Not at all. Our team supports you from day one, regardless of your level.' },
          { q: 'Can I try before committing?', a: 'Yes. First session or trial class is free. No credit card required.' },
          { q: 'What if I do not have much time?', a: 'Flexible plans starting at 20 minutes. We adapt to your schedule, not the other way around.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Discover the best of ${industry} with ${name}`,
        subhero: (audience, benefit) =>
          `For ${audience} who value quality and results. ${cap(benefit)} with a standard that makes the difference.`,
        features: [
          () => `Quality validated by thousands of customers`,
          () => `Simple process, no paperwork`,
          () => `Satisfaction guarantee`,
        ],
        featureDescs: [
          'Thousands of positive reviews back every service we offer.',
          'Book in 3 clicks. No endless forms or phone confirmations.',
          'If you are not satisfied, we refund your money. No questions asked.',
        ],
        social: {
          quote: 'The best decision I made this year. The service is impeccable and the results are real.',
          author: '— Regular customer',
        },
        faq: [
          { q: 'How long until I see results?', a: 'Most clients notice improvements within the first 2 weeks.' },
          { q: 'Is it safe?', a: 'We meet all quality and safety standards in the industry.' },
          { q: 'Do you have family plans?', a: 'Yes. Special discounts for families and groups of friends.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: where ${industry} feels different`,
        subhero: (audience, benefit) =>
          `Made for ${audience} tired of the ordinary. ${cap(benefit)} in an environment designed for your wellbeing.`,
        features: [
          () => `Environment designed for your comfort`,
          () => `Certified professionals`,
          () => `A community that pushes you forward`,
        ],
        featureDescs: [
          'Every detail is designed to make your experience exceptional.',
          'Team with international certifications and years of experience.',
          'Connect with people who share your goals and motivate you to keep going.',
        ],
        social: {
          quote: 'It is not just a service, it is an experience. I leave renewed after every visit.',
          author: '— Member since 2023',
        },
        faq: [
          { q: 'Do I need to bring anything?', a: 'Everything you need is included. Just bring your willingness to enjoy.' },
          { q: 'Is there parking?', a: 'Yes, free parking for customers at all our locations.' },
          { q: 'Can I gift an experience?', a: 'Of course. Digital gift cards available instantly.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `With ${name}, ${industry} is easier than you think`,
        subhero: (audience, benefit) =>
          `Made for ${audience} who want results without complications. ${cap(benefit)} in a simple and fun way.`,
        features: [
          () => `Start in minutes, not weeks`,
          () => `Support that feels human`,
          () => `Clear pricing, no surprises`,
        ],
        featureDescs: [
          'Sign up today and start enjoying the benefits immediately.',
          'Our team replies in minutes and speaks your language. No robots.',
          'You know exactly how much you pay before confirming. No hidden fees.',
        ],
        social: {
          quote: 'I thought it would be complicated. It was so easy I already recommended it to my whole family.',
          author: '— New customer',
        },
        faq: [
          { q: 'Is it hard to get started?', a: 'Not at all. Three steps and you are in. And if you have questions, we help on the spot.' },
          { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no penalties. Your freedom is our priority.' },
          { q: 'Are there discounts for new customers?', a: 'Yes, 20% off your first purchase or subscription.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the ${industry} that adapts to you`,
        subhero: (audience, benefit) =>
          `For busy ${audience}. ${cap(benefit)} when and where it works best for you.`,
        features: [
          () => `Hours that fit your routine`,
          () => `No lines or waiting`,
          () => `Results you can feel`,
        ],
        featureDescs: [
          'Open early, late, and weekends. You choose the time.',
          'Book ahead and walk straight in to enjoy.',
          'Customers come back because it really worked for them.',
        ],
        social: {
          quote: 'With my crazy schedule, I thought I could not do it. But it fit perfectly into my hours.',
          author: '— Professional with a complex schedule',
        },
        faq: [
          { q: 'What if I am late?', a: 'You have a 10-minute grace period. After that, we reschedule at no cost.' },
          { q: 'Do I need a membership?', a: 'Not mandatory. You can pay per use or pick a plan that fits you.' },
          { q: 'Do you offer home service?', a: 'In select areas, yes. Check availability in your zip code.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Your ${industry} moment starts with ${name}`,
        subhero: (audience, benefit) =>
          `For ${audience} who deserve a break. ${cap(benefit)} while you take care of yourself.`,
        features: [
          () => `Relaxing experience from the entrance`,
          () => `Highest quality products`,
          () => `Environment designed for your wellbeing`,
        ],
        featureDescs: [
          'From the moment you walk in, everything is set up for you to feel at peace.',
          'We only work with premium brands and certified products.',
          'Lighting, music, and aromas carefully selected for your comfort.',
        ],
        social: {
          quote: 'It is my weekly ritual. Two hours just for me that change my entire week.',
          author: '— Loyal client since 2022',
        },
        faq: [
          { q: 'Can I walk in without an appointment?', a: 'Yes, we accept walk-ins based on availability. Booking ahead is recommended.' },
          { q: 'Are there gift options?', a: 'Physical and digital gift cards, ready to send instantly.' },
          { q: 'Is it suitable for beginners?', a: 'Absolutely. Our team adapts the experience to your comfort level.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `Forget ordinary. ${name} redefines ${industry}`,
        subhero: (audience, benefit) =>
          `For ${audience} who do not settle for mediocre. ${cap(benefit)} with an experience that makes the difference.`,
        features: [
          () => `Results the competition cannot match`,
          () => `Cutting-edge technology at your service`,
          () => `Customers who come back again and again`,
        ],
        featureDescs: [
          'Proven metrics that show why we lead the industry.',
          'Latest-generation equipment and innovative techniques.',
          '95% of customers renew after the first month. That says it all.',
        ],
        social: {
          quote: 'I tried 5 places before. None come close. This is another level.',
          author: '— Demanding customer',
        },
        faq: [
          { q: 'Why are you better than the competition?', a: 'We invest triple in training and equipment. Results speak for themselves.' },
          { q: 'Is it worth the price?', a: 'Our customers report a perceived value 3× higher than the price paid.' },
          { q: 'Is there a waitlist?', a: 'For peak hours, we recommend booking 48 hours in advance.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the secret of those who already made it`,
        subhero: (audience, benefit) =>
          `Join ${audience} who already discovered the difference. ${cap(benefit)} without excuses or shortcuts.`,
        features: [
          () => `Method proven by thousands`,
          () => `Guaranteed results or your money back`,
          () => `Exclusive community access`,
        ],
        featureDescs: [
          'A process refined over years with thousands of success stories.',
          'If you do not see results in 30 days, full refund. No fine print.',
          'Exclusive events, premium content, and networking with ambitious people.',
        ],
        social: {
          quote: 'In 90 days I transformed something I had tried for years. The key was the method.',
          author: '— Client who reached their goal',
        },
        faq: [
          { q: 'How long is the program?', a: 'Plans from 4 weeks to 12 months, depending on your goal.' },
          { q: 'Do I need total commitment?', a: 'We recommend consistency, but we adapt the pace to your reality.' },
          { q: 'What happens after I finish?', a: 'Lifetime community access and special maintenance discounts.' },
        ],
      },
      {
        hero: (name, industry) =>
          `It is not for everyone. ${name} is for those who want ${industry} for real`,
        subhero: (audience, benefit) =>
          `If you are ambitious ${audience}, this is for you. ${cap(benefit)} with a standard few reach.`,
        features: [
          () => `Exclusivity you can feel`,
          () => `1-on-1 attention from experts`,
          () => `Results that impress`,
        ],
        featureDescs: [
          'Limited spots to maintain the quality our clients expect.',
          'No mass groups. Your own dedicated specialist for your progress.',
          'Visible, measurable changes that you and those around you will notice.',
        ],
        social: {
          quote: 'The smartest investment I made in myself. Results exceeded my expectations.',
          author: '— High-performance entrepreneur',
        },
        faq: [
          { q: 'Why do you limit spots?', a: 'We prefer quality over quantity. Every client deserves top-tier attention.' },
          { q: 'Is it really 1-on-1?', a: 'Yes. Individual sessions with certified professionals, not assistants.' },
          { q: 'What is the next step?', a: 'Book a free evaluation. We assess your goals and design your plan.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, uncomplicated.`,
        subhero: (audience, benefit) =>
          `For ${audience} who value simplicity. ${cap(benefit)} with a clear, direct process.`,
        features: [
          () => `Book in 2 clicks`,
          () => `No contracts or fine print`,
          () => `Only pay for what you use`,
        ],
        featureDescs: [
          'Enter, choose your service, confirm. Done in under a minute.',
          'Use when you want. No commitments or cancellation penalties.',
          'Transparent pricing. No mandatory memberships or surprise charges.',
        ],
        social: {
          quote: 'Exactly what I needed: simple, fast, and effective. No fluff.',
          author: '— Straightforward customer',
        },
        faq: [
          { q: 'Do I need to register?', a: 'Just email and phone. Ready in 30 seconds.' },
          { q: 'Is there a mobile app?', a: 'Yes. Available for iOS and Android. Book from anywhere.' },
          { q: 'What payment methods do you accept?', a: 'Card, bank transfer, cash, and digital wallets.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the essentials of ${industry}`,
        subhero: (audience, benefit) =>
          `For ${audience} who do not want distractions. ${cap(benefit)} with only what truly matters.`,
        features: [
          () => `No features you will not use`,
          () => `Consistent quality`,
          () => `Instant access`,
        ],
        featureDescs: [
          'No confusing menus or unnecessary options. Just what you need.',
          'The same high standard on every visit, no exceptions.',
          'No waiting, no long processes. Walk in and start immediately.',
        ],
        social: {
          quote: 'Finally something that does not try to sell me things I do not need. It just works.',
          author: '— Pragmatic customer',
        },
        faq: [
          { q: 'Are extras included?', a: 'Optional and clearly marked. Nothing hidden in fine print.' },
          { q: 'Can I pause my plan?', a: 'Yes. Freeze your plan for up to 3 months without losing benefits.' },
          { q: 'Is there support?', a: 'Email and chat. Response in under 4 hours during business hours.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: your ${industry} space`,
        subhero: (audience, benefit) =>
          `For ${audience} who seek consistency. ${cap(benefit)} in a place that feels like home.`,
        features: [
          () => `Familiar and welcoming atmosphere`,
          () => `Extended hours`,
          () => `Fair pricing`,
        ],
        featureDescs: [
          'A space designed for you to feel comfortable from your very first visit.',
          'Open when you need us most, including weekends.',
          'Premium quality at accessible prices. Without sacrificing anything.',
        ],
        social: {
          quote: 'I go every week because it feels like my place. The team knows me by name.',
          author: '— Long-time client',
        },
        faq: [
          { q: 'Are pets allowed?', a: 'Depends on location. Check with your nearest branch.' },
          { q: 'Is there parking?', a: 'Yes, free at most locations.' },
          { q: 'Can I bring a companion?', a: 'Yes, comfortable waiting areas available for companions.' },
        ],
      },
    ],
  },
};

/* ── B2B templates ── */
const B2B = {
  es: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: la solución de ${industry} que reduce costos operativos desde el primer mes`,
        subhero: (audience, benefit) =>
          `Construida para ${audience} que necesitan resultados medibles. ${cap(benefit)} con una implementación ágil y soporte garantizado.`,
        features: [
          (b) => `Automatización que entrega ${b.toLowerCase()} real`,
          () => `ROI visible en los primeros 30 días`,
          () => `Integración sin interrumpir tu operación`,
        ],
        featureDescs: [
          'Elimina procesos manuales que consumen horas de tu equipo cada semana.',
          'Dashboard de ahorro que traduce eficiencia en números concretos para dirección.',
          'Conecta con tus sistemas actuales sin migraciones traumáticas ni downtime.',
        ],
        social: {
          quote: 'Redujimos costos operativos un 35% en el primer trimestre. La integración fue transparente.',
          author: '— CFO, empresa manufacturera',
        },
        faq: [
          { q: '¿Cuánto tiempo toma la implementación?', a: 'La mayoría de empresas está operativa en 5 a 10 días hábiles.' },
          { q: '¿Requiere capacitación extensa?', a: 'No. Interfaz intuitiva y onboarding guiado. Tu equipo estará productivo en horas.' },
          { q: '¿Ofrecen soporte dedicado?', a: 'Sí. Un especialista asignado durante los primeros 90 días sin costo adicional.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} optimiza cada proceso de ${industry} que afecta tus resultados`,
        subhero: (audience, benefit) =>
          `Diseñada para ${audience} que gestionan presupuestos ajustados. ${cap(benefit)} sin aumentar la plantilla.`,
        features: [
          () => `Eficiencia que se traduce en ahorro`,
          () => `Reportes ejecutivos automáticos`,
          () => `Escalabilidad garantizada`,
        ],
        featureDescs: [
          'Reduce tiempos de ciclo en un promedio del 40% desde el mes uno.',
          'Informes listos para board meetings, generados automáticamente cada semana.',
          'Crece de 10 a 1,000 usuarios sin degradación del rendimiento ni costos ocultos.',
        ],
        social: {
          quote: 'Hacemos más con el mismo equipo. Las métricas de productividad subieron un 28% en 60 días.',
          author: '— Director de Operaciones',
        },
        faq: [
          { q: '¿Funciona para empresas pequeñas?', a: 'Sí. Desde equipos de 5 personas hasta corporaciones de 5,000.' },
          { q: '¿Hay costos de implementación?', a: 'Incluidos en el plan anual. Sin cargos sorpresa ni tarifas de activación.' },
          { q: '¿Cumple con normativas?', a: 'ISO 27001, GDPR, y SOC 2 Type II. Auditorías trimestrales incluidas.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: la infraestructura de ${industry} en la que confían las empresas líderes`,
        subhero: (audience, benefit) =>
          `Para ${audience} que priorizan estabilidad y rendimiento. ${cap(benefit)} respaldado por acuerdos de nivel de servicio contractuales.`,
        features: [
          () => `Uptime del 99.99% garantizado`,
          () => `Seguridad de grado empresarial`,
          () => `Soporte 24/7 con SLA`,
        ],
        featureDescs: [
          'Acuerdo de nivel de servicio con compensación por downtime. Tu operación nunca se detiene.',
          'Encriptación end-to-end, autenticación multifactor y auditorías de penetración continuas.',
          'Especialistas técnicos disponibles en cualquier momento, con tiempos de respuesta garantizados.',
        ],
        social: {
          quote: 'Migrar fue la decisión más fácil del año. Cero downtime, cero fricción, resultados inmediatos.',
          author: '— CTO, corporación multinacional',
        },
        faq: [
          { q: '¿Qué pasa si crecemos rápido?', a: 'La infraestructura escala automáticamente. Sin intervención de tu equipo de TI.' },
          { q: '¿Ofrecen auditorías de seguridad?', a: 'Sí, informes trimestrales disponibles para todos los clientes Enterprise.' },
          { q: '¿Hay contratos a largo plazo?', a: 'Planes mensuales disponibles. Confiamos en que te quedarás por los resultados.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `${name} hace que ${industry} funcione para tu equipo, no contra él`,
        subhero: (audience, benefit) =>
          `Pensado para ${audience} que odian la burocracia. ${cap(benefit)} sin manuales de 200 páginas ni tutoriales interminables.`,
        features: [
          () => `Tu equipo productivo en horas, no en semanas`,
          () => `Soporte humano que entiende tu negocio`,
          () => `Precios claros, sin sorpresas en la factura`,
        ],
        featureDescs: [
          'Onboarding guiado que tiene a tu equipo trabajando el mismo día de la implementación.',
          'No bots genéricos. Especialistas que conocen tu industria y responden en minutos.',
          'Lo que ves es lo que pagas. Sin cargos de mantenimiento ocultos ni tarifas de soporte.',
        ],
        social: {
          quote: 'Finalmente una herramienta que el equipo adoptó sin resistencia. Eso no tiene precio.',
          author: '— Gerente de Transformación Digital',
        },
        faq: [
          { q: '¿Necesita mi equipo ser técnico?', a: 'Para nada. Diseñado para usuarios de negocio. Cero curva de aprendizaje.' },
          { q: '¿Hay prueba gratuita para empresas?', a: 'Sí, 30 días con soporte incluido. Sin tarjeta de crédito ni compromiso.' },
          { q: '¿Puedo cambiar de plan?', a: 'Claro. Escala o reduce según necesites. Sin penalizaciones ni renegociaciones.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Con ${name}, tu equipo de ${industry} nunca trabaja solo`,
        subhero: (audience, benefit) =>
          `Para ${audience} que valoran respaldo real. ${cap(benefit)} con especialistas dedicados a tu éxito.`,
        features: [
          () => `Acompañamiento desde la primera reunión`,
          () => `Respuestas en minutos, no en días`,
          () => `Comunidad de líderes de ${industry}`,
        ],
        featureDescs: [
          'Un success manager asignado que conoce tu cuenta y objetivos específicos.',
          'Tiempo medio de respuesta: 12 minutos en horario laboral. Medido, no prometido.',
          'Webinars exclusivos, plantillas probadas y networking con profesionales de tu sector.',
        ],
        social: {
          quote: 'Tuve una duda crítica un viernes por la noche. Me respondieron en 8 minutos. Eso es servicio.',
          author: '— Directora de Proyectos',
        },
        faq: [
          { q: '¿El soporte es real o un bot?', a: 'Humanos 100% durante horario laboral. Bots disponibles 24/7 para consultas simples.' },
          { q: '¿Hay recursos para capacitar al equipo?', a: 'Academy empresarial con cursos, certificaciones y sesiones en vivo mensuales.' },
          { q: '¿Me ayudan a migrar desde otro sistema?', a: 'Sí. Migración gratuita y asistida incluida en todos los planes anuales.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: precios que entienden el presupuesto de una ${industry}`,
        subhero: (audience, benefit) =>
          `Para ${audience} cansados de sorpresas en la factura. ${cap(benefit)} con total transparencia financiera.`,
        features: [
          () => `Sin costos de implementación ocultos`,
          () => `Cancela cuando quieras`,
          () => `ROI positivo desde el mes 1`,
        ],
        featureDescs: [
          'Configuración, capacitación y soporte inicial incluidos. Sin tarifas de activación.',
          'Contratos mensuales disponibles. Si no te convence, te vas sin preguntas ni penalizaciones.',
          'Dashboard financiero que muestra ahorro y ganancia generada en tiempo real.',
        ],
        social: {
          quote: 'Por primera vez entiendo exactamente qué estoy pagando. Y el ROI superó las proyecciones.',
          author: '— Controller, empresa mediana',
        },
        faq: [
          { q: '¿Hay tarifas de mantenimiento?', a: 'Ninguna. Actualizaciones, mejoras y soporte incluidos en tu plan.' },
          { q: '¿Puedo pagar mensual?', a: 'Sí. Mensual, trimestral o anual con 2 meses gratis. Tú eliges.' },
          { q: '¿Qué pasa si crecemos?', a: 'Descuentos automáticos por volumen. Mientras más usuarios, menos paga cada uno.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `${name} deja atrás a tu competencia en ${industry}`,
        subhero: (audience, benefit) =>
          `Si eres ${audience} con ambición, deja de conformarte. ${cap(benefit)} a una velocidad que tu competencia no puede igualar.`,
        features: [
          () => `Eficiencia 3× superior a la categoría`,
          () => `Infraestructura preparada para escalar`,
          () => `Resultados medibles en 7 días`,
        ],
        featureDescs: [
          'Tiempos de respuesta y throughput que superan los benchmarks del sector por un 40%.',
          'Arquitectura cloud-native que escala de 10 a 10,000 usuarios sin fricción.',
          'No esperes trimestres. La mayoría de clientes B2B reporta impacto en la primera semana.',
        ],
        social: {
          quote: 'Duplicamos la productividad del equipo comercial en el primer trimestre. Sin excusas.',
          author: '— CEO, empresa en crecimiento',
        },
        faq: [
          { q: '¿Es realmente más rápido?', a: 'Nuestros benchmarks públicos superan al mercado en un 40% promedio. Pídenos la prueba.' },
          { q: '¿Qué pasa si no funciona?', a: 'Reembolso completo en 60 días. Sin preguntas, sin letra pequeña.' },
          { q: '¿Escala para organizaciones grandes?', a: 'Desde 5 hasta 50,000 usuarios. La infraestructura ni se inmuta.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} es el motor de productividad que ${industry} necesitaba`,
        subhero: (audience, benefit) =>
          `Para ${audience} con presión por resultados. ${cap(benefit)} y reduce costos sin aumentar la plantilla.`,
        features: [
          () => `Automatización que elimina cuellos de botella`,
          () => `Productividad medible y reportable`,
          () => `Ventaja competitiva tangible`,
        ],
        featureDescs: [
          'Elimina tareas repetitivas antes de que se conviertan en problemas operativos.',
          'Métricas de productividad por equipo, departamento y individuo. Listas para dirección.',
          'Reduce time-to-market y costos operativos mientras tu competencia sigue procesando manualmente.',
        ],
        social: {
          quote: 'Crecimos un 250% en un año y no contratamos personal administrativo. La automatización lo hizo todo.',
          author: '— COO, scale-up',
        },
        faq: [
          { q: '¿Cuánto tiempo hasta ver ROI?', a: 'El 80% de nuestros clientes B2B reporta ROI positivo en los primeros 45 días.' },
          { q: '¿Reemplaza a mi equipo?', a: 'No. Libera a tu equipo de tareas mecánicas para que se enfoquen en estrategia.' },
          { q: '¿Hay límites de uso?', a: 'Ninguno. Usuarios, transacciones, datos: ilimitados en todos los planes empresariales.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: la confianza que los líderes de ${industry} necesitan`,
        subhero: (audience, benefit) =>
          `Deja de improvisar. ${cap(benefit)} con una plataforma que respalda cada promesa con resultados documentados.`,
        features: [
          () => `Garantía de resultados con SLAs`,
          () => `Soporte ejecutivo prioritario`,
          () => `Mejoras continuas basadas en feedback`,
        ],
        featureDescs: [
          'SLAs contractuales con compensación económica. Tu éxito está garantizado por escrito.',
          'Línea directa con especialistas senior. Sin filas, no tickets de soporte genéricos.',
          'Actualizaciones semanales impulsadas por solicitudes reales de clientes empresariales.',
        ],
        social: {
          quote: 'Nunca había contratado una solución empresarial con tanta tranquilidad. La garantía lo cambia todo.',
          author: '— Director de Procurement',
        },
        faq: [
          { q: '¿La garantía tiene letra pequeña?', a: 'Ninguna. Si no cumplimos los SLAs, compensamos automáticamente.' },
          { q: '¿Las actualizaciones cuestan extra?', a: 'No. Todas las mejoras incluidas. Para siempre. Sin versiones pagas adicionales.' },
          { q: '¿Puedo hablar con alguien antes de comprar?', a: 'Sí. Call con un especialista de soluciones, sin compromiso ni presión de venta.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, sin fricción.`,
        subhero: (audience, benefit) =>
          `Para ${audience} que no pueden permitirse complicaciones. ${cap(benefit)} con un proceso claro y predecible.`,
        features: [
          () => `Implementación en 48 horas`,
          () => `Sin contratos a largo plazo`,
          () => `Solo pagas por lo que usas`,
        ],
        featureDescs: [
          'Tu equipo operando en menos de 2 días. Sin instalaciones complejas ni capacitación extensa.',
          'Planes mensuales sin permanencia. Cancela cuando quieras, sin penalizaciones.',
          'Facturación transparente por usuario activo. Sin cargos de mantenimiento ni soporte oculto.',
        ],
        social: {
          quote: 'Lo que necesitábamos: simple, rápido y predecible. Sin reuniones de implementación eternas.',
          author: '— Gerente General, pyme',
        },
        faq: [
          { q: '¿Requiere IT interno?', a: 'No. Configuración cloud que tu equipo gestiona sin conocimientos técnicos.' },
          { q: '¿Hay onboarding?', a: 'Sí, de 30 minutos. Suficiente para que tu equipo empiece a trabajar.' },
          { q: '¿Qué pasa si dejamos de usarlo?', a: 'Exporta tus datos en cualquier momento. Sin trámites ni costos de salida.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: lo esencial de ${industry} para equipos productivos`,
        subhero: (audience, benefit) =>
          `Para ${audience} que odian el software abultado. ${cap(benefit)} con solo las funciones que realmente usas.`,
        features: [
          () => `Sin funciones que nunca abrirás`,
          () => `Configuración en minutos`,
          () => `Precio por usuario, sin sorpresas`,
        ],
        featureDescs: [
          'Cada función justificada por casos de uso reales. Nada de bloatware corporativo.',
          'Inicia sesión, invita a tu equipo, empieza. Sin procesos de activación de varios días.',
          'Una sola tarifa clara por usuario. Sin tiers confusos, addons o costos ocultos.',
        ],
        social: {
          quote: 'Finalmente un software empresarial que no intenta hacer de todo. Solo hace lo que necesitamos, perfecto.',
          author: '— Jefe de Departamento',
        },
        faq: [
          { q: '¿Me faltarán funciones?', a: 'Probablemente no. Cubrimos el 95% de casos de uso B2B sin complicaciones.' },
          { q: '¿Se integra con otras herramientas?', a: 'Sí, con las 15 más populares. Zapier y API para el resto.' },
          { q: '¿Puedo exportar datos?', a: 'Siempre. CSV, Excel, PDF o API. Tus datos son tuyos sin restricciones.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: tu operación de ${industry}, simplificada`,
        subhero: (audience, benefit) =>
          `Para ${audience} que priorizan la eficiencia. ${cap(benefit)} en una plataforma donde todo tiene sentido.`,
        features: [
          () => `Organización lógica por defecto`,
          () => `Sin notificaciones invasivas`,
          () => `Acceso desde cualquier dispositivo`,
        ],
        featureDescs: [
          'Tu información se estructura automáticamente. No pierdas tiempo organizando carpetas.',
          'Tú decides cuándo revisar actualizaciones. Sin pings constantes que rompen tu concentración.',
          'Web, móvil y tablet. La misma experiencia impecable en cualquier pantalla.',
        ],
        social: {
          quote: 'Uso en la oficina, en casa y en viajes. Siempre funciona igual de bien. Mi equipo lo adoptó en un día.',
          author: '— Director Ejecutivo',
        },
        faq: [
          { q: '¿Funciona sin conexión?', a: 'Sí. Los cambios se sincronizan automáticamente cuando recuperas conexión.' },
          { q: '¿Es rápido?', a: 'Carga en menos de 2 segundos. Incluso con conexiones de hotel o aeropuerto.' },
          { q: '¿Hay app móvil?', a: 'Sí, nativa para iOS y Android. Sin costo adicional.' },
        ],
      },
    ],
  },
  en: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: the ${industry} solution that cuts operational costs from month one`,
        subhero: (audience, benefit) =>
          `Built for ${audience} who need measurable outcomes. ${cap(benefit)} with agile implementation and guaranteed support.`,
        features: [
          (b) => `Automation that delivers real ${b.toLowerCase()}`,
          () => `Visible ROI within 30 days`,
          () => `Integration without disrupting operations`,
        ],
        featureDescs: [
          'Eliminate manual processes that consume hours of your team every week.',
          'Savings dashboard that translates efficiency into concrete numbers for leadership.',
          'Connect with your current systems without traumatic migrations or downtime.',
        ],
        social: {
          quote: 'We cut operational costs by 35% in Q1. The integration was completely transparent.',
          author: '— CFO, manufacturing company',
        },
        faq: [
          { q: 'How long does implementation take?', a: 'Most companies are operational within 5 to 10 business days.' },
          { q: 'Does it require extensive training?', a: 'No. Intuitive interface and guided onboarding. Your team is productive within hours.' },
          { q: 'Do you offer dedicated support?', a: 'Yes. A dedicated specialist assigned for the first 90 days at no extra cost.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} optimizes every ${industry} process that affects your bottom line`,
        subhero: (audience, benefit) =>
          `Designed for ${audience} managing tight budgets. ${cap(benefit)} without expanding headcount.`,
        features: [
          () => `Efficiency that translates to savings`,
          () => `Automated executive reports`,
          () => `Guaranteed scalability`,
        ],
        featureDescs: [
          'Reduce cycle times by an average of 40% from month one.',
          'Reports ready for board meetings, generated automatically every week.',
          'Grow from 10 to 1,000 users with no performance degradation or hidden costs.',
        ],
        social: {
          quote: 'We do more with the same team. Productivity metrics rose 28% in 60 days.',
          author: '— Director of Operations',
        },
        faq: [
          { q: 'Does it work for small businesses?', a: 'Yes. From teams of 5 to corporations of 5,000.' },
          { q: 'Are there implementation costs?', a: 'Included in the annual plan. No surprise charges or activation fees.' },
          { q: 'Is it compliant?', a: 'ISO 27001, GDPR, and SOC 2 Type II. Quarterly audits included.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the ${industry} infrastructure trusted by leading companies`,
        subhero: (audience, benefit) =>
          `For ${audience} who prioritize stability and performance. ${cap(benefit)} backed by contractual service level agreements.`,
        features: [
          () => `99.99% uptime guaranteed`,
          () => `Enterprise-grade security`,
          () => `24/7 support with SLA`,
        ],
        featureDescs: [
          'Service level agreement with compensation for downtime. Your operations never stop.',
          'End-to-end encryption, multi-factor authentication, and continuous penetration testing.',
          'Technical specialists available anytime, with guaranteed response times.',
        ],
        social: {
          quote: 'Migrating was the easiest decision of the year. Zero downtime, zero friction, immediate results.',
          author: '— CTO, multinational corporation',
        },
        faq: [
          { q: 'What if we grow fast?', a: 'Infrastructure scales automatically. No intervention from your IT team required.' },
          { q: 'Do you offer security audits?', a: 'Yes, quarterly reports available to all Enterprise customers.' },
          { q: 'Are there long-term contracts?', a: 'Monthly plans available. We trust you will stay for the results.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `${name} makes ${industry} work for your team, not against it`,
        subhero: (audience, benefit) =>
          `Made for ${audience} who hate bureaucracy. ${cap(benefit)} without 200-page manuals or endless tutorials.`,
        features: [
          () => `Your team productive in hours, not weeks`,
          () => `Human support that understands your business`,
          () => `Clear pricing, no billing surprises`,
        ],
        featureDescs: [
          'Guided onboarding that has your team working on the same day as implementation.',
          'No generic bots. Specialists who know your industry and reply in minutes.',
          'What you see is what you pay. No hidden maintenance charges or support fees.',
        ],
        social: {
          quote: 'Finally a tool the team adopted without resistance. That is priceless.',
          author: '— Digital Transformation Manager',
        },
        faq: [
          { q: 'Does my team need to be technical?', a: 'Not at all. Designed for business users. Zero learning curve.' },
          { q: 'Is there a free business trial?', a: 'Yes, 30 days with support included. No credit card or commitment.' },
          { q: 'Can I change plans?', a: 'Of course. Scale up or down as needed. No penalties or renegotiations.' },
        ],
      },
      {
        hero: (name, industry) =>
          `With ${name}, your ${industry} team never works alone`,
        subhero: (audience, benefit) =>
          `For ${audience} who value real backup. ${cap(benefit)} with dedicated specialists invested in your success.`,
        features: [
          () => `Support from the first meeting`,
          () => `Answers in minutes, not days`,
          () => `Community of ${industry} leaders`,
        ],
        featureDescs: [
          'A success manager assigned who knows your account and specific objectives.',
          'Average response time: 12 minutes during business hours. Measured, not promised.',
          'Exclusive webinars, proven templates, and networking with professionals in your sector.',
        ],
        social: {
          quote: 'I had a critical question on a Friday night. They replied in 8 minutes. That is service.',
          author: '— Project Director',
        },
        faq: [
          { q: 'Is support real or a bot?', a: '100% humans during business hours. Bots available 24/7 for simple queries.' },
          { q: 'Are there training resources for the team?', a: 'Business Academy with courses, certifications, and live monthly sessions.' },
          { q: 'Do you help migrate from another system?', a: 'Yes. Free assisted migration included in all annual plans.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: pricing that understands a ${industry} budget`,
        subhero: (audience, benefit) =>
          `For ${audience} tired of billing surprises. ${cap(benefit)} with total financial transparency.`,
        features: [
          () => `No hidden implementation costs`,
          () => `Cancel anytime`,
          () => `Positive ROI from month 1`,
        ],
        featureDescs: [
          'Setup, training, and initial support included. No activation fees or surprise charges.',
          'Monthly contracts available. If it is not for you, leave with no questions or penalties.',
          'Financial dashboard showing savings and generated profit in real time.',
        ],
        social: {
          quote: 'For the first time I understand exactly what I am paying for. And ROI exceeded projections.',
          author: '— Controller, mid-size company',
        },
        faq: [
          { q: 'Are there maintenance fees?', a: 'None. Updates, improvements, and support included in your plan.' },
          { q: 'Can I pay monthly?', a: 'Yes. Monthly, quarterly, or annual with 2 months free. You choose.' },
          { q: 'What if we grow?', a: 'Automatic volume discounts. The more users, the less each one pays.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `${name} leaves your ${industry} competition behind`,
        subhero: (audience, benefit) =>
          `If you are ambitious ${audience}, stop settling. ${cap(benefit)} at a speed your competition cannot match.`,
        features: [
          () => `3× efficiency vs. the category average`,
          () => `Infrastructure ready to scale`,
          () => `Measurable results in 7 days`,
        ],
        featureDescs: [
          'Response times and throughput that beat industry benchmarks by 40%.',
          'Cloud-native architecture that scales from 10 to 10,000 users without friction.',
          'Do not wait for quarters. Most B2B clients report impact in the first week.',
        ],
        social: {
          quote: 'We doubled our sales team productivity in Q1. No excuses.',
          author: '— CEO, growing company',
        },
        faq: [
          { q: 'Is it really faster?', a: 'Our public benchmarks outperform the market by 40% on average. Ask for the proof.' },
          { q: 'What if it does not work?', a: 'Full refund within 60 days. No questions, no fine print.' },
          { q: 'Does it scale for large organizations?', a: 'From 5 to 50,000 users. The infrastructure does not flinch.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} is the productivity engine ${industry} needed`,
        subhero: (audience, benefit) =>
          `For ${audience} under results pressure. ${cap(benefit)} and cut costs without expanding headcount.`,
        features: [
          () => `Automation that eliminates bottlenecks`,
          () => `Measurable, reportable productivity`,
          () => `Tangible competitive edge`,
        ],
        featureDescs: [
          'Eliminate repetitive tasks before they become operational problems.',
          'Productivity metrics by team, department, and individual. Ready for leadership.',
          'Reduce time-to-market and operational costs while competitors still process manually.',
        ],
        social: {
          quote: 'We grew 250% in a year and hired zero administrative staff. Automation did it all.',
          author: '— COO, scale-up',
        },
        faq: [
          { q: 'How fast until I see ROI?', a: '80% of our B2B clients report positive ROI within the first 45 days.' },
          { q: 'Will it replace my team?', a: 'No. It frees your team from mechanical tasks so they focus on strategy.' },
          { q: 'Are there usage limits?', a: 'None. Users, transactions, data: unlimited on all enterprise plans.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the confidence ${industry} leaders need`,
        subhero: (audience, benefit) =>
          `Stop improvising. ${cap(benefit)} with a platform that backs every promise with documented results.`,
        features: [
          () => `Results guarantee with SLAs`,
          () => `Executive priority support`,
          () => `Continuous improvements from feedback`,
        ],
        featureDescs: [
          'Contractual SLAs with financial compensation. Your success is guaranteed in writing.',
          'Direct line to senior specialists. No queues, no generic support tickets.',
          'Weekly updates driven by real requests from enterprise customers.',
        ],
        social: {
          quote: 'I have never bought enterprise software with this much confidence. The guarantee changes everything.',
          author: '— Procurement Director',
        },
        faq: [
          { q: 'Is there fine print on the guarantee?', a: 'None. If we do not meet SLAs, we compensate automatically.' },
          { q: 'Do updates cost extra?', a: 'No. All improvements included. Forever. No additional paid versions.' },
          { q: 'Can I talk to someone before buying?', a: 'Yes. Call with a solutions specialist, no commitment or sales pressure.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, without friction.`,
        subhero: (audience, benefit) =>
          `For ${audience} who cannot afford complications. ${cap(benefit)} with a clear, predictable process.`,
        features: [
          () => `Implementation in 48 hours`,
          () => `No long-term contracts`,
          () => `Only pay for what you use`,
        ],
        featureDescs: [
          'Your team operating in under 2 days. No complex installations or extensive training.',
          'Monthly plans with no lock-in. Cancel anytime with no penalties.',
          'Transparent per-active-user billing. No maintenance or hidden support charges.',
        ],
        social: {
          quote: 'Exactly what we needed: simple, fast, and predictable. Without endless implementation meetings.',
          author: '— General Manager, SMB',
        },
        faq: [
          { q: 'Does it require internal IT?', a: 'No. Cloud configuration your team manages with zero technical knowledge.' },
          { q: 'Is there onboarding?', a: 'Yes, 30 minutes. Enough for your team to start working.' },
          { q: 'What if we stop using it?', a: 'Export your data anytime. No exit procedures or costs.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the essentials of ${industry} for productive teams`,
        subhero: (audience, benefit) =>
          `For ${audience} who hate bloated software. ${cap(benefit)} with only the features you actually use.`,
        features: [
          () => `No features you will never open`,
          () => `Setup in minutes`,
          () => `Per-user pricing, no surprises`,
        ],
        featureDescs: [
          'Every feature justified by real use cases. No corporate bloatware.',
          'Log in, invite your team, start. No multi-day activation processes.',
          'One clear rate per user. No confusing tiers, add-ons, or hidden costs.',
        ],
        social: {
          quote: 'Finally enterprise software that does not try to do everything. It just does what we need, perfectly.',
          author: '— Department Head',
        },
        faq: [
          { q: 'Will I miss features?', a: 'Probably not. We cover 95% of B2B use cases without complications.' },
          { q: 'Does it integrate with other tools?', a: 'Yes, with the top 15 most popular. Zapier and API for everything else.' },
          { q: 'Can I export data?', a: 'Always. CSV, Excel, PDF, or API. Your data is yours with no restrictions.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: your ${industry} operation, simplified`,
        subhero: (audience, benefit) =>
          `For ${audience} who prioritize efficiency. ${cap(benefit)} on a platform where everything makes sense.`,
        features: [
          () => `Logical organization by default`,
          () => `No invasive notifications`,
          () => `Access from any device`,
        ],
        featureDescs: [
          'Your information structures itself automatically. No time wasted organizing folders.',
          'You decide when to check updates. No constant pings breaking your concentration.',
          'Web, mobile, and tablet. The same smooth experience on any screen.',
        ],
        social: {
          quote: 'I use it at the office, at home, and while traveling. Always works just as well. My team adopted it in a day.',
          author: '— CEO',
        },
        faq: [
          { q: 'Does it work offline?', a: 'Yes. Changes sync automatically when you reconnect.' },
          { q: 'Is it fast?', a: 'Loads in under 2 seconds. Even on hotel or airport connections.' },
          { q: 'Is there a mobile app?', a: 'Yes, native for iOS and Android. No extra cost.' },
        ],
      },
    ],
  },
};

/* ── SaaS templates ── */
const SAAS = {
  es: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: la plataforma de ${industry} que tu equipo implementa en horas, no en meses`,
        subhero: (audience, benefit) =>
          `Construida para ${audience} que necesitan resultados sin retrasos. ${cap(benefit)} con una arquitectura cloud-native y API abierta.`,
        features: [
          (b) => `Automatización inteligente para ${b.toLowerCase()}`,
          () => `Integración nativa con 50+ herramientas`,
          () => `Escalabilidad automática sin configuración`,
        ],
        featureDescs: [
          'Workflows automatizados que eliminan tareas repetitivas y liberan a tu equipo de desarrollo.',
          'Conecta con Slack, Salesforce, HubSpot, Jira y docenas más en minutos. Sin código.',
          'La infraestructura escala sola según demanda. Tu equipo de DevOps puede dormir tranquilo.',
        ],
        social: {
          quote: 'La integración con nuestro stack tomó 2 horas. En semanas pasadas con otros proveedores, meses.',
          author: '— Lead Developer',
        },
        faq: [
          { q: '¿Ofrecen API REST?', a: 'Sí, API REST completa con documentación interactiva (OpenAPI/Swagger) y SDKs para Node, Python y Go.' },
          { q: '¿Qué tan rápido es el onboarding?', a: 'La mayoría de equipos técnicos está integrado en menos de 4 horas.' },
          { q: '¿Hay sandbox para pruebas?', a: 'Sí, entorno de staging ilimitado y gratuito para todos los planes.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} convierte datos de ${industry} en producto competitivo`,
        subhero: (audience, benefit) =>
          `Para ${audience} que construyen el futuro. ${cap(benefit)} con una plataforma diseñada para developers y product managers.`,
        features: [
          () => `Webhooks en tiempo real`,
          () => `Análisis de uso y métricas de producto`,
          () => `Multi-tenant con aislamiento completo`,
        ],
        featureDescs: [
          'Recibe eventos al instante. Sin polling, sin delays. Arquitectura event-driven de verdad.',
          'Entiende cómo tus usuarios interactúan con tu producto. Datos accionables, no vanity metrics.',
          'Cada cliente en su espacio aislado. Seguridad y performance garantizadas por diseño.',
        ],
        social: {
          quote: 'El multi-tenant es verdaderamente aislado. Pasamos auditoría de seguridad de enterprise en la primera revisión.',
          author: '— CTO, SaaS B2B',
        },
        faq: [
          { q: '¿Soporta SSO y SAML?', a: 'Sí. SSO con SAML 2.0, OAuth 2.0, OpenID Connect y SCIM para provisioning automático.' },
          { q: '¿Hay límites de rate?', a: 'Generosos límites por defecto. Enterprise puede solicitar límites personalizados sin costo.' },
          { q: '¿Dónde están los datos?', a: 'EU, US, y APAC. Elige tu región. Cumplimiento GDPR, SOC 2, e ISO 27001.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: la infraestructura de ${industry} con 99.99% uptime SLA`,
        subhero: (audience, benefit) =>
          `Para ${audience} que no pueden permitirse downtime. ${cap(benefit)} con redundancia multi-región y soporte técnico 24/7.`,
        features: [
          () => `Arquitectura multi-región activa-activa`,
          () => `Backups automáticos cada 15 minutos`,
          () => `Monitoreo proactivo con alertas inteligentes`,
        ],
        featureDescs: [
          'Si una región falla, el tráfico se redirige automáticamente. Tus usuarios ni se enteran.',
          'Backups incrementales con retención de 30 días. Restauración punto-en-tiempo en minutos.',
          'Nuestro equipo de SRE monitorea tu instancia 24/7. Te contactamos antes de que notes el problema.',
        ],
        social: {
          quote: 'Un año de uso. Cero incidentes reportados por nuestros clientes finales. Eso es confiabilidad.',
          author: '— VP de Ingeniería',
        },
        faq: [
          { q: '¿Qué pasa si hay un outage?', a: 'SLA con compensación financiera. Equipo de crisis activo en menos de 5 minutos.' },
          { q: '¿Ofrecen status page pública?', a: 'Sí, status page con historial de uptime y suscripción a alertas por email/SMS/Slack.' },
          { q: '¿Hay soporte para custom domains?', a: 'Sí, con SSL automático (Let\'s Encrypt) y opción de traer tu propio certificado.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `${name} hace que construir en ${industry} sea más fácil de lo que crees`,
        subhero: (audience, benefit) =>
          `Pensado para ${audience} que odian la complejidad innecesaria. ${cap(benefit)} con una experiencia de developer que realmente disfrutarás.`,
        features: [
          () => `Documentación que no te hace llorar`,
          () => `SDKs listos para usar`,
          () => `Comunidad activa de developers`,
        ],
        featureDescs: [
          'Docs interactivas con ejemplos de código copy-paste. Sin páginas de 5000 palabras que nadie lee.',
          'SDKs oficiales para JavaScript, Python, Ruby, Go, PHP y Java. Actualizados mensualmente.',
          'Foro, Discord y Stack Overflow taggeado. Pregunta y recibe respuesta en minutos, no días.',
        ],
        social: {
          quote: 'La documentación es tan buena que implementé la integración en una tarde. Sin Stack Overflow.',
          author: '— Developer independiente',
        },
        faq: [
          { q: '¿Necesito ser experto para usar la API?', a: 'Para nada. Primer request funcionando en 5 minutos con nuestro quickstart guiado.' },
          { q: '¿Hay prueba gratuita?', a: 'Sí, 10,000 requests/mes gratis para siempre. Sin tarjeta de crédito.' },
          { q: '¿Puedo cambiar de plan?', a: 'Claro. Escala automáticamente o baja manualmente. Sin penalizaciones.' },
        ],
      },
      {
        hero: (name, industry) =>
          `Con ${name}, tu equipo de ${industry} nunca codea solo`,
        subhero: (audience, benefit) =>
          `Para ${audience} que valoran respaldo técnico real. ${cap(benefit)} con especialistas que hablan tu lenguaje.`,
        features: [
          () => `Onboarding técnico personalizado`,
          () => `Soporte de developers para developers`,
          () => `Recursos open source y plantillas`,
        ],
        featureDescs: [
          'Un solutions engineer te acompaña en tus primeras integraciones. Gratis, sin límite de tiempo.',
          'Soporte técnico con developers reales, no agents de primer nivel. Tiempo medio: 15 minutos.',
          'Repositorios open source, starters kits, y plantillas de Terraform/CloudFormation listas para usar.',
        ],
        social: {
          quote: 'El solutions engineer se unió a una call de mi equipo y resolvió 3 problemas en 20 minutos. Gratis.',
          author: '— Engineering Lead',
        },
        faq: [
          { q: '¿El soporte es realmente técnico?', a: 'Sí. Todos nuestros agents tienen background en software engineering.' },
          { q: '¿Hay recursos para aprender?', a: 'Academy técnica con cursos, workshops y certificaciones gratuitas.' },
          { q: '¿Pueden auditarnos nuestra integración?', a: 'Sí. Architecture review gratuita una vez al año para clientes Business+.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: precios de ${industry} que escalan contigo`,
        subhero: (audience, benefit) =>
          `Para ${audience} que odian las sorpresas en la factura. ${cap(benefit)} con precios predecibles y transparentes.`,
        features: [
          () => `Pricing basado en uso real`,
          () => `Alertas de gasto configurables`,
          () => `Sin costos de salida`,
        ],
        featureDescs: [
          'Paga exactamente por lo que consumes. Sin mínimos contractuales ni over-provisioning obligatorio.',
          'Recibe alertas cuando tu gasto se acerca a un umbral. Nunca más facturas sorpresa.',
          'Exporta tus datos y cierra tu cuenta cuando quieras. Sin cargos de cancelación ni retención de datos.',
        ],
        social: {
          quote: 'El pricing es tan transparente que mi CFO lo entendió en 30 segundos. Y eso no pasa seguido.',
          author: '— VP de Finanzas, startup tech',
        },
        faq: [
          { q: '¿Hay costos ocultos?', a: 'Ninguno. Todo lo que pagas está listado en nuestra página de pricing. Sin asteriscos.' },
          { q: '¿Puedo estimar mi gasto?', a: 'Sí. Calculadora de costos interactiva basada en tu volumen estimado de uso.' },
          { q: '¿Qué pasa si me paso del plan?', a: 'Escalas automáticamente al siguiente tier. Sin downtime ni intervención manual.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `${name} es la infraestructura de ${industry} que la competencia desearía tener`,
        subhero: (audience, benefit) =>
          `Para ${audience} que construyen productos ambiciosos. ${cap(benefit)} con velocidad y confiabilidad que marcan la diferencia.`,
        features: [
          () => `Throughput que humilla a la categoría`,
          () => `Tecnología de punta, lista para producción`,
          () => `Resultados que tus usuarios notarán`,
        ],
        featureDescs: [
          'Procesa millones de requests por segundo con latencia consistente bajo los 50ms.',
          'Edge computing, GraphQL nativo, y WebSockets. Todo listo, no en roadmap.',
          'Tiempos de carga que mejoran tus métricas de conversión y retención de usuarios.',
        ],
        social: {
          quote: 'Migrar redujo nuestro time-to-first-byte en un 70%. Los usuarios lo notaron al instante.',
          author: '— Principal Engineer',
        },
        faq: [
          { q: '¿Es realmente tan rápido?', a: 'Benchmarks públicos disponibles. Superamos a AWS/GCP equivalentes en latencia por un 40%.' },
          { q: '¿Qué pasa si no cumplen?', a: 'SLA con compensación. Pero en 3 años de operación, nunca hemos tenido que pagar una.' },
          { q: '¿Escala para productos masivos?', a: 'Desde MVP hasta millones de usuarios activos. La infraestructura no tiene techo práctico.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: el motor de producto que ${industry} necesitaba`,
        subhero: (audience, benefit) =>
          `Para ${audience} con presión de shippear. ${cap(benefit)} y escala sin que tu equipo de infra se derrita.`,
        features: [
          () => `Ship features, no infraestructura`,
          () => `Auto-scaling sin configuración`,
          () => `Observability incluida de fábrica`,
        ],
        featureDescs: [
          'Tu equipo se enfoca en features de producto. Nosotros manejamos servers, patches, y optimización.',
          'El tráfico sube un 1000% y tu app ni se inmuta. Sin alertas falsas ni pagers a las 3am.',
          'Logs, métricas, y tracing distribuido incluidos. Dashboard de observabilidad lista para usar.',
        ],
        social: {
          quote: 'Dejamos de contratar SREs. La plataforma se maneja sola y mi equipo duerme de noche.',
          author: '— CTO, SaaS en hipercrecimiento',
        },
        faq: [
          { q: '¿Puedo traer mi propio stack?', a: 'Sí. Funciona con cualquier framework moderno: Next.js, Django, Rails, Laravel, Spring Boot.' },
          { q: '¿Necesito Docker/Kubernetes?', a: 'Opcional. Deploy directo desde Git con zero-config, o trae tus propios contenedores.' },
          { q: '¿Hay vendor lock-in?', a: 'Mínimo. Usamos estándares abiertos. Tu código es tuyo. Migrar toma horas, no meses.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: la confianza que los builders de ${industry} necesitan`,
        subhero: (audience, benefit) =>
          `Deja de improvisar con infraestructura. ${cap(benefit)} con una plataforma que respalda cada commit con estabilidad.`,
        features: [
          () => `Preview environments por PR`,
          () => `Rollback en un click`,
          () => `Zero-downtime deployments`,
        ],
        featureDescs: [
          'Cada pull request genera un entorno de preview con URL única. Review sin tocar producción.',
          '¿Algo salió mal? Un click y estás en la versión anterior. Sin estrés, sin scripts manuales.',
          'Deploya 20 veces al día sin que un solo usuario note interrupción. Blue-green por defecto.',
        ],
        social: {
          quote: 'Deployamos 50 veces al día sin miedo. El rollback salvó nuestro Black Friday dos veces.',
          author: '— VP de Producto',
        },
        faq: [
          { q: '¿Soporta monorepos?', a: 'Sí. Detección automática de cambios y deploys independientes por servicio.' },
          { q: '¿Qué pasa con las migrations?', a: 'Zero-downtime migrations con rollback plan incluido. Validamos antes de ejecutar.' },
          { q: '¿Puedo tener múltiples environments?', a: 'Ilimitados. Dev, staging, QA, demo, producción. Cada uno con su propia configuración.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, sin complicaciones técnicas.`,
        subhero: (audience, benefit) =>
          `Para ${audience} que no quieren lidiar con infraestructura. ${cap(benefit)} con una API limpia y documentación clara.`,
        features: [
          () => `Primer request en 5 minutos`,
          () => `Sin contratos ni letra pequeña`,
          () => `Solo pagas por requests reales`,
        ],
        featureDescs: [
          'Copia el ejemplo de la documentación, pega tu API key, y funciona. Sin tutoriales de 2 horas.',
          'Usa cuando quieras. Sin compromisos, sin mínimos de consumo, sin penalizaciones por cancelar.',
          'Billing por request procesado. Sin cargos base mensuales que pagues aunque no uses el servicio.',
        ],
        social: {
          quote: 'Integro APIs para vivir. Esta fue la más simple que he implementado en 10 años de carrera.',
          author: '— Freelance developer',
        },
        faq: [
          { q: '¿Necesito tarjeta para empezar?', a: 'No. 10,000 requests/mes gratis. Solo agrega tarjeta cuando quieras escalar.' },
          { q: '¿Hay SDK?', a: 'Sí, para los 6 lenguajes más populares. Cada uno con tests y ejemplos incluidos.' },
          { q: '¿Qué métodos de pago aceptan?', a: 'Tarjeta, transferencia ACH/SEPA, y facturación para enterprise.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: la API de ${industry} que no te hará googlear errores`,
        subhero: (audience, benefit) =>
          `Para ${audience} que valoran su tiempo. ${cap(benefit)} con una API intuitiva y errores que realmente explican qué pasó.`,
        features: [
          () => `Errores descriptivos y accionables`,
          () => `Status codes que tienen sentido`,
          () => `Versionado que no rompe nada`,
        ],
        featureDescs: [
          'Cada error incluye mensaje claro, código de error, y link a documentación con la solución.',
          'HTTP estándar, sin códigos propietarios confusos. Tu cliente HTTP favorito funciona perfecto.',
          'Nunca rompemos backwards compatibility. Nuevas versiones opt-in, no forzadas.',
        ],
        social: {
          quote: 'Por primera vez una API donde los errores me dicen exactamente qué arreglar. Sin adivinar.',
          author: '— Backend Engineer',
        },
        faq: [
          { q: '¿Qué pasa si cambian la API?', a: 'Deprecation notices con 12 meses de anticipación. Nunca forzamos upgrades.' },
          { q: '¿Hay rate limits agresivos?', a: 'No. Límites generosos y headers que indican tu cuota restante en cada request.' },
          { q: '¿Soportan GraphQL?', a: 'Sí, endpoint GraphQL completo además de REST. Elige lo que prefieras.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: tu stack de ${industry}, simplificado`,
        subhero: (audience, benefit) =>
          `Para ${audience} que odian el vendor sprawl. ${cap(benefit)} con una sola plataforma que cubre todo lo esencial.`,
        features: [
          () => `Todo en una API`,
          () => `Un dashboard, no diez`,
          () => `Una factura clara`,
        ],
        featureDescs: [
          'Una sola integración cubre el 90% de casos de uso. Sin conectar 5 servicios diferentes.',
          'Monitorea uso, performance, y logs en un solo lugar. Sin saltar entre herramientas.',
          'Una línea en tu factura. Sin sorpresas de 3 vendors diferentes que nadie autorizó.',
        ],
        social: {
          quote: 'Redujimos de 7 integraciones a 1. Menos código, menos bugs, menos facturas. Simple.',
          author: '— Tech Lead',
        },
        faq: [
          { q: '¿Reemplaza a servicios que ya uso?', a: 'Probablemente a varios. Evaluamos gratis qué puedes consolidar.' },
          { q: '¿Puedo migrar gradualmente?', a: 'Sí. Corre en paralelo con tu stack actual. Migra servicio por servicio sin riesgo.' },
          { q: '¿Hay uptime garantizado?', a: '99.99% SLA con compensación. Status page pública con histórico completo.' },
        ],
      },
    ],
  },
  en: {
    professional: [
      {
        hero: (name, industry) =>
          `${name}: the ${industry} platform your team deploys in hours, not months`,
        subhero: (audience, benefit) =>
          `Built for ${audience} who need results without delays. ${cap(benefit)} with a cloud-native architecture and open API.`,
        features: [
          (b) => `Smart automation for ${b.toLowerCase()}`,
          () => `Native integration with 50+ tools`,
          () => `Automatic scalability with zero config`,
        ],
        featureDescs: [
          'Automated workflows that eliminate repetitive tasks and free up your dev team.',
          'Connect with Slack, Salesforce, HubSpot, Jira and dozens more in minutes. No code required.',
          'Infrastructure scales automatically with demand. Your DevOps team can sleep soundly.',
        ],
        social: {
          quote: 'Integrating with our stack took 2 hours. With previous providers, it took months.',
          author: '— Lead Developer',
        },
        faq: [
          { q: 'Do you offer a REST API?', a: 'Yes, full REST API with interactive documentation (OpenAPI/Swagger) and SDKs for Node, Python, and Go.' },
          { q: 'How fast is onboarding?', a: 'Most technical teams are integrated within 4 hours.' },
          { q: 'Is there a sandbox for testing?', a: 'Yes, unlimited free staging environment on all plans.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name} turns ${industry} data into competitive product`,
        subhero: (audience, benefit) =>
          `For ${audience} building the future. ${cap(benefit)} with a platform designed for developers and product managers.`,
        features: [
          () => `Real-time webhooks`,
          () => `Usage analytics and product metrics`,
          () => `Multi-tenant with complete isolation`,
        ],
        featureDescs: [
          'Receive events instantly. No polling, no delays. True event-driven architecture.',
          'Understand how users interact with your product. Actionable data, not vanity metrics.',
          'Every customer in their isolated space. Security and performance guaranteed by design.',
        ],
        social: {
          quote: 'The multi-tenant isolation is real. We passed enterprise security audit on the first review.',
          author: '— CTO, B2B SaaS',
        },
        faq: [
          { q: 'Do you support SSO and SAML?', a: 'Yes. SSO with SAML 2.0, OAuth 2.0, OpenID Connect, and SCIM for automatic provisioning.' },
          { q: 'Are there rate limits?', a: 'Generous default limits. Enterprise can request custom limits at no cost.' },
          { q: 'Where is data stored?', a: 'EU, US, and APAC. Choose your region. GDPR, SOC 2, and ISO 27001 compliant.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the ${industry} infrastructure with 99.99% uptime SLA`,
        subhero: (audience, benefit) =>
          `For ${audience} who cannot afford downtime. ${cap(benefit)} with multi-region redundancy and 24/7 technical support.`,
        features: [
          () => `Active-active multi-region architecture`,
          () => `Automatic backups every 15 minutes`,
          () => `Proactive monitoring with smart alerts`,
        ],
        featureDescs: [
          'If one region fails, traffic redirects automatically. Your users never notice.',
          'Incremental backups with 30-day retention. Point-in-time recovery in minutes.',
          'Our SRE team monitors your instance 24/7. We contact you before you notice the problem.',
        ],
        social: {
          quote: 'One year of use. Zero incidents reported by our end customers. That is reliability.',
          author: '— VP of Engineering',
        },
        faq: [
          { q: 'What happens during an outage?', a: 'SLA with financial compensation. Crisis team active within 5 minutes.' },
          { q: 'Do you offer a public status page?', a: 'Yes, status page with uptime history and subscription to email/SMS/Slack alerts.' },
          { q: 'Is custom domain support available?', a: 'Yes, with automatic SSL (Let\'s Encrypt) and option to bring your own certificate.' },
        ],
      },
    ],
    friendly: [
      {
        hero: (name, industry) =>
          `${name} makes building in ${industry} easier than you think`,
        subhero: (audience, benefit) =>
          `Made for ${audience} who hate unnecessary complexity. ${cap(benefit)} with a developer experience you will actually enjoy.`,
        features: [
          () => `Documentation that does not make you cry`,
          () => `Ready-to-use SDKs`,
          () => `Active developer community`,
        ],
        featureDescs: [
          'Interactive docs with copy-paste code examples. No 5,000-word pages nobody reads.',
          'Official SDKs for JavaScript, Python, Ruby, Go, PHP, and Java. Updated monthly.',
          'Forum, Discord, and tagged Stack Overflow. Ask and get answers in minutes, not days.',
        ],
        social: {
          quote: 'The documentation is so good I implemented the integration in one afternoon. No Stack Overflow needed.',
          author: '— Independent developer',
        },
        faq: [
          { q: 'Do I need to be an expert to use the API?', a: 'Not at all. First request working in 5 minutes with our guided quickstart.' },
          { q: 'Is there a free trial?', a: 'Yes, 10,000 requests/month free forever. No credit card required.' },
          { q: 'Can I change plans?', a: 'Of course. Scale automatically or downgrade manually. No penalties.' },
        ],
      },
      {
        hero: (name, industry) =>
          `With ${name}, your ${industry} team never codes alone`,
        subhero: (audience, benefit) =>
          `For ${audience} who value real technical backup. ${cap(benefit)} with specialists who speak your language.`,
        features: [
          () => `Personalized technical onboarding`,
          () => `Developer-to-developer support`,
          () => `Open source resources and templates`,
        ],
        featureDescs: [
          'A solutions engineer accompanies your first integrations. Free, with no time limit.',
          'Technical support with real developers, not first-level agents. Average time: 15 minutes.',
          'Open source repos, starter kits, and ready-to-use Terraform/CloudFormation templates.',
        ],
        social: {
          quote: 'The solutions engineer joined a team call and solved 3 problems in 20 minutes. For free.',
          author: '— Engineering Lead',
        },
        faq: [
          { q: 'Is support really technical?', a: 'Yes. All our agents have software engineering backgrounds.' },
          { q: 'Are there learning resources?', a: 'Technical Academy with courses, workshops, and free certifications.' },
          { q: 'Can you audit our integration?', a: 'Yes. Free architecture review once a year for Business+ customers.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: ${industry} pricing that scales with you`,
        subhero: (audience, benefit) =>
          `For ${audience} who hate billing surprises. ${cap(benefit)} with predictable, transparent pricing.`,
        features: [
          () => `Usage-based pricing`,
          () => `Configurable spending alerts`,
          () => `No exit costs`,
        ],
        featureDescs: [
          'Pay exactly for what you consume. No contractual minimums or mandatory over-provisioning.',
          'Get alerts when your spending approaches a threshold. No more surprise invoices.',
          'Export your data and close your account anytime. No cancellation fees or data retention.',
        ],
        social: {
          quote: 'The pricing is so transparent my CFO understood it in 30 seconds. And that does not happen often.',
          author: '— VP of Finance, tech startup',
        },
        faq: [
          { q: 'Are there hidden costs?', a: 'None. Everything you pay is listed on our pricing page. No asterisks.' },
          { q: 'Can I estimate my costs?', a: 'Yes. Interactive cost calculator based on your estimated usage volume.' },
          { q: 'What if I exceed my plan?', a: 'You automatically scale to the next tier. No downtime or manual intervention.' },
        ],
      },
    ],
    bold: [
      {
        hero: (name, industry) =>
          `${name} is the ${industry} infrastructure your competition wishes they had`,
        subhero: (audience, benefit) =>
          `For ${audience} building ambitious products. ${cap(benefit)} with speed and reliability that make the difference.`,
        features: [
          () => `Throughput that embarrasses the category`,
          () => `Cutting-edge tech, production-ready`,
          () => `Results your users will notice`,
        ],
        featureDescs: [
          'Process millions of requests per second with consistent latency under 50ms.',
          'Edge computing, native GraphQL, and WebSockets. All ready, not on the roadmap.',
          'Load times that improve your conversion and user retention metrics.',
        ],
        social: {
          quote: 'Migrating reduced our time-to-first-byte by 70%. Users noticed immediately.',
          author: '— Principal Engineer',
        },
        faq: [
          { q: 'Is it really that fast?', a: 'Public benchmarks available. We beat equivalent AWS/GCP services in latency by 40%.' },
          { q: 'What if you do not deliver?', a: 'SLA with compensation. But in 3 years of operation, we have never had to pay one.' },
          { q: 'Does it scale for massive products?', a: 'From MVP to millions of active users. The infrastructure has no practical ceiling.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the product engine ${industry} needed`,
        subhero: (audience, benefit) =>
          `For ${audience} under shipping pressure. ${cap(benefit)} and scale without your infra team melting down.`,
        features: [
          () => `Ship features, not infrastructure`,
          () => `Auto-scaling without configuration`,
          () => `Observability included out of the box`,
        ],
        featureDescs: [
          'Your team focuses on product features. We handle servers, patches, and optimization.',
          'Traffic spikes 1000% and your app does not flinch. No false alarms or 3am pages.',
          'Logs, metrics, and distributed tracing included. Observability dashboard ready to use.',
        ],
        social: {
          quote: 'We stopped hiring SREs. The platform handles itself and my team sleeps at night.',
          author: '— CTO, hypergrowth SaaS',
        },
        faq: [
          { q: 'Can I bring my own stack?', a: 'Yes. Works with any modern framework: Next.js, Django, Rails, Laravel, Spring Boot.' },
          { q: 'Do I need Docker/Kubernetes?', a: 'Optional. Zero-config deploy from Git, or bring your own containers.' },
          { q: 'Is there vendor lock-in?', a: 'Minimal. We use open standards. Your code is yours. Migration takes hours, not months.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the confidence ${industry} builders need`,
        subhero: (audience, benefit) =>
          `Stop improvising with infrastructure. ${cap(benefit)} with a platform that backs every commit with stability.`,
        features: [
          () => `Preview environments per PR`,
          () => `One-click rollback`,
          () => `Zero-downtime deployments`,
        ],
        featureDescs: [
          'Every pull request generates a preview environment with a unique URL. Review without touching production.',
          'Something went wrong? One click and you are on the previous version. No stress, no manual scripts.',
          'Deploy 20 times a day without a single user noticing interruption. Blue-green by default.',
        ],
        social: {
          quote: 'We deploy 50 times a day without fear. Rollback saved our Black Friday twice.',
          author: '— VP of Product',
        },
        faq: [
          { q: 'Do you support monorepos?', a: 'Yes. Automatic change detection and independent deploys per service.' },
          { q: 'What about migrations?', a: 'Zero-downtime migrations with rollback plan included. We validate before executing.' },
          { q: 'Can I have multiple environments?', a: 'Unlimited. Dev, staging, QA, demo, production. Each with its own configuration.' },
        ],
      },
    ],
    minimal: [
      {
        hero: (name, industry) =>
          `${name}. ${industry}, without technical complications.`,
        subhero: (audience, benefit) =>
          `For ${audience} who do not want to deal with infrastructure. ${cap(benefit)} with a clean API and clear documentation.`,
        features: [
          () => `First request in 5 minutes`,
          () => `No contracts or fine print`,
          () => `Only pay for actual requests`,
        ],
        featureDescs: [
          'Copy the example from the docs, paste your API key, and it works. No 2-hour tutorials.',
          'Use when you want. No commitments, no usage minimums, no cancellation penalties.',
          'Billing per processed request. No monthly base fees you pay even when not using the service.',
        ],
        social: {
          quote: 'I integrate APIs for a living. This was the simplest I have implemented in 10 years.',
          author: '— Freelance developer',
        },
        faq: [
          { q: 'Do I need a card to start?', a: 'No. 10,000 requests/month free. Only add a card when you want to scale.' },
          { q: 'Are there SDKs?', a: 'Yes, for the 6 most popular languages. Each with tests and examples included.' },
          { q: 'What payment methods do you accept?', a: 'Card, ACH/SEPA transfer, and invoicing for enterprise.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: the ${industry} API that will not make you google errors`,
        subhero: (audience, benefit) =>
          `For ${audience} who value their time. ${cap(benefit)} with an intuitive API and errors that actually explain what happened.`,
        features: [
          () => `Descriptive, actionable errors`,
          () => `Status codes that make sense`,
          () => `Versioning that breaks nothing`,
        ],
        featureDescs: [
          'Every error includes a clear message, error code, and link to documentation with the solution.',
          'Standard HTTP, no confusing proprietary codes. Your favorite HTTP client works perfectly.',
          'We never break backwards compatibility. New versions are opt-in, not forced.',
        ],
        social: {
          quote: 'For the first time an API where errors tell me exactly what to fix. No guessing.',
          author: '— Backend Engineer',
        },
        faq: [
          { q: 'What if the API changes?', a: 'Deprecation notices 12 months in advance. We never force upgrades.' },
          { q: 'Are there aggressive rate limits?', a: 'No. Generous limits and headers indicating your remaining quota on every request.' },
          { q: 'Do you support GraphQL?', a: 'Yes, full GraphQL endpoint in addition to REST. Choose what you prefer.' },
        ],
      },
      {
        hero: (name, industry) =>
          `${name}: your ${industry} stack, simplified`,
        subhero: (audience, benefit) =>
          `For ${audience} who hate vendor sprawl. ${cap(benefit)} with a single platform covering all the essentials.`,
        features: [
          () => `Everything in one API`,
          () => `One dashboard, not ten`,
          () => `One clear invoice`,
        ],
        featureDescs: [
          'One integration covers 90% of use cases. No connecting 5 different services.',
          'Monitor usage, performance, and logs in one place. No jumping between tools.',
          'One line on your invoice. No surprises from 3 different vendors nobody authorized.',
        ],
        social: {
          quote: 'We reduced from 7 integrations to 1. Less code, fewer bugs, fewer invoices. Simple.',
          author: '— Tech Lead',
        },
        faq: [
          { q: 'Does it replace services I already use?', a: 'Probably several. We evaluate for free what you can consolidate.' },
          { q: 'Can I migrate gradually?', a: 'Yes. Run in parallel with your current stack. Migrate service by service with no risk.' },
          { q: 'Is uptime guaranteed?', a: '99.99% SLA with compensation. Public status page with full history.' },
        ],
      },
    ],
  },
};

/* ── main TEMPLATES map ── */
const TEMPLATES = { es: {}, en: {} };

['es', 'en'].forEach((lang) => {
  ['professional', 'friendly', 'bold', 'minimal'].forEach((tone) => {
    TEMPLATES[lang][tone] = {
      b2c: B2C[lang][tone],
      b2b: B2B[lang][tone],
      saas: SAAS[lang][tone],
    };
  });
});

/* ── exports ── */
export function generate(inputs) {
  const { name, industry, audience, benefit, tone, lang, businessType, variation = 0 } = inputs;
  const type = businessType || 'b2b';
  const variations = TEMPLATES[lang]?.[tone]?.[type] ?? B2B.es.professional;
  const t = variations[variation % variations.length];

  const features = t.features.map((fn, i) => ({
    title: fn(benefit),
    description: t.featureDescs[i],
  }));

  return {
    headline: t.hero(name, industry, benefit),
    subheadline: t.subhero(audience, benefit),
    cta: t.cta,
    features,
    socialProof: t.social,
    faq: t.faq,
  };
}

export function generateAllVariations(inputs) {
  const { name, industry, audience, benefit, tone, lang, businessType } = inputs;
  const type = businessType || 'b2b';
  const variations = TEMPLATES[lang]?.[tone]?.[type] ?? B2B.es.professional;
  return variations.map((_, i) => generate({ ...inputs, variation: i }));
}

export function copyText(landing) {
  const lines = [
    landing.headline,
    '',
    landing.subheadline,
    '',
    `CTA: ${landing.cta}`,
    '',
    'Features:',
    ...landing.features.map((f) => `- ${f.title}: ${f.description}`),
    '',
    'Social Proof:',
    `${landing.socialProof.quote} ${landing.socialProof.author}`,
    '',
    'FAQ:',
    ...landing.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`),
  ];
  return lines.join('\n');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function buildHTML(landing, brandName) {
  const featureCards = landing.features
    .map(
      (f) => `
    <div class="feature-card">
      <h3>${escapeHtml(f.title)}</h3>
      <p>${escapeHtml(f.description)}</p>
    </div>`
    )
    .join('\n');

  const faqItems = landing.faq
    .map(
      (f) => `
    <details class="faq-item">
      <summary>${escapeHtml(f.q)}</summary>
      <p>${escapeHtml(f.a)}</p>
    </details>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(brandName)}</title>
  <style>
    :root {
      --bg: #0b0c10;
      --surface: #151621;
      --surface-2: #1f202c;
      --border: #2a2b3a;
      --text: #c9cdd4;
      --text-h: #f3f4f6;
      --muted: #8b8f98;
      --accent: #8b5cf6;
      --accent-2: #a78bfa;
    }
    * { box-sizing: border-box; margin: 0; }
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      border-bottom: 1px solid var(--border);
      max-width: 1200px;
      margin: 0 auto;
    }
    .navbar .brand {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-h);
      letter-spacing: -0.3px;
    }
    .navbar .nav-links a {
      color: var(--muted);
      text-decoration: none;
      margin-left: 28px;
      font-size: 14px;
      font-weight: 500;
    }
    .navbar .nav-links a:hover { color: var(--text-h); }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
    }
    .hero {
      text-align: center;
      padding: 80px 20px 60px;
      background: radial-gradient(120% 100% at 50% 0%, rgba(139,92,246,0.10), transparent 60%);
    }
    .hero h1 {
      font-size: 42px;
      font-weight: 800;
      color: var(--text-h);
      max-width: 700px;
      margin: 0 auto 16px;
      line-height: 1.15;
      letter-spacing: -0.5px;
    }
    .hero p {
      font-size: 18px;
      color: var(--text);
      max-width: 560px;
      margin: 0 auto 28px;
    }
    .cta-btn {
      display: inline-block;
      background: var(--accent);
      color: #fff;
      padding: 14px 28px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
    }
    .section {
      padding: 60px 0;
    }
    .section-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--muted);
      margin-bottom: 20px;
      text-align: center;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .feature-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
    }
    .feature-card h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-h);
      margin-bottom: 8px;
    }
    .feature-card p { font-size: 15px; color: var(--text); }
    .social-proof {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 40px;
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }
    .social-proof blockquote {
      font-size: 22px;
      font-style: italic;
      color: var(--text-h);
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .social-proof cite {
      font-size: 14px;
      color: var(--muted);
      font-style: normal;
    }
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 700px;
      margin: 0 auto;
    }
    .faq-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 20px;
    }
    .faq-item summary {
      font-weight: 600;
      color: var(--text-h);
      cursor: pointer;
      list-style: none;
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item p {
      margin-top: 10px;
      font-size: 15px;
      color: var(--text);
    }
    .footer {
      text-align: center;
      padding: 32px 24px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 14px;
      max-width: 1200px;
      margin: 0 auto;
    }
    @media (max-width: 600px) {
      .navbar { padding: 16px 20px; }
      .navbar .nav-links a { margin-left: 16px; font-size: 13px; }
      .container { padding: 0 20px; }
      .hero h1 { font-size: 28px; }
      .hero p { font-size: 16px; }
      .social-proof blockquote { font-size: 18px; }
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="brand">${escapeHtml(brandName)}</div>
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="#testimonial">Testimonial</a>
      <a href="#faq">FAQ</a>
    </div>
  </nav>

  <section class="hero">
    <h1>${escapeHtml(landing.headline)}</h1>
    <p>${escapeHtml(landing.subheadline)}</p>
    <a href="#" class="cta-btn">${escapeHtml(landing.cta)}</a>
  </section>

  <div class="container">
    <section class="section" id="features">
      <h2 class="section-title">Features</h2>
      <div class="features-grid">
        ${featureCards}
      </div>
    </section>

    <section class="section" id="testimonial">
      <h2 class="section-title">What our users say</h2>
      <div class="social-proof">
        <blockquote>"${escapeHtml(landing.socialProof.quote)}"</blockquote>
        <cite>${escapeHtml(landing.socialProof.author)}</cite>
      </div>
    </section>

    <section class="section" id="faq">
      <h2 class="section-title">Frequently asked questions</h2>
      <div class="faq-list">
        ${faqItems}
      </div>
    </section>
  </div>

  <footer class="footer">
    &copy; ${new Date().getFullYear()} ${escapeHtml(brandName)}. All rights reserved.
  </footer>
</body>
</html>`;
}
