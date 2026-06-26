export const site = {
  name: "TU MARCA",
  // Entidad legal que aparece en las páginas de privacidad y términos.
  legalEntity: "TU ENTIDAD LEGAL S.L.",
  domain: "tudominio.com",
  email: "hola@tudominio.com",
  tagline: "Inteligencia artificial, automatización y software a medida.",
  // Pega aquí la URL del webhook (p. ej. GoHighLevel) que recibe los formularios.
  webhookUrl: "PEGA_AQUI_TU_WEBHOOK_URL",
  whatsappNumber: "+340000000000",
  // Sustituye el número (sin "+") y el texto pre-rellenado del mensaje.
  whatsappUrl:
    "https://wa.me/340000000000?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.",
};

export const nav = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos", href: "/#casos" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
];

export const hero = {
  headline: "Potencia tu Negocio con Inteligencia Artificial.",
  highlightWord: "Inteligencia Artificial",
  subtitle:
    "Auditamos tus procesos, diseñamos la solución a medida y la implementamos contigo. De principio a fin.",
  cta: { label: "Descubre Cómo", href: "/#manifesto" },
};

export const manifesto = {
  eyebrow: "Manifesto",
  title: "Hacemos que tu Negocio Funcione Mejor.",
  body:
    "Trabajamos con equipos que quieren resolver problemas reales y recuperar tiempo. Diseñamos sistemas que funcionan desde el primer día y nos quedamos contigo para que sigan funcionando.",
  links: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Cómo Trabajamos", href: "/#proceso" },
  ],
};

export const marqueeWords = [
  "Inteligencia artificial",
  "Automatización",
  "Agentes IA",
  "Asistentes de voz",
  "Software a medida",
  "Consultoría",
  "Captación",
  "Operaciones",
  "Procesos internos",
];

export const about = {
  eyebrow: "Quiénes Somos",
  title: "¿Por Qué Nosotros?",
  intro:
    "Un equipo técnico que habla tu idioma. Sin burocracia. Soluciones que funcionan desde el primer día y nos quedamos contigo.",
  pillars: [
    {
      number: "01",
      title: "Sin Intermediarios",
      description:
        "Quien diseña tu solución es quien la construye. Tú hablas directo con el equipo técnico, sin intermediarios.",
    },
    {
      number: "02",
      title: "Solo lo que Encaja",
      description:
        "No recomendamos IA donde no hace falta. Primero entendemos el problema, después elegimos la herramienta.",
    },
    {
      number: "03",
      title: "De Auditoría a Producción",
      description:
        "No entregamos un PDF con recomendaciones. Construimos el sistema, lo integramos y lo dejamos funcionando.",
    },
    {
      number: "04",
      title: "Después de la Entrega",
      description:
        "No desaparecemos. Iteramos, ajustamos y evolucionamos la solución contigo mientras tu negocio crece.",
    },
  ],
  stats: [
    { value: "+40", label: "Procesos automatizados" },
    { value: "+15", label: "Sectores con experiencia" },
    { value: "100%", label: "Soluciones a medida, siempre" },
    { value: "24h", label: "Tiempo medio de respuesta" },
  ],
};

export const cases = {
  eyebrow: "Casos & Sectores",
  title: "Donde",
  titleAccent: "Aportamos Valor",
  intro:
    "Cada sector tiene sus propios retos. Adaptamos la solución a tu operativa y a tus tiempos.",
  items: [
    {
      name: "SaaS & Tech",
      description: "Onboarding, soporte tier 1, scoring de leads, operaciones internas.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    },
    {
      name: "Ecommerce",
      description: "Atención post-venta, recuperación de carrito, automatización logística.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop",
    },
    {
      name: "Servicios Profesionales",
      description: "Captación, propuestas, gestión documental y reporting interno.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80&auto=format&fit=crop",
    },
    {
      name: "Real Estate",
      description: "Calificación de contactos, agendado de visitas, seguimiento de cartera.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
    },
    {
      name: "Salud & Bienestar",
      description: "Recordatorios, recall de pacientes, gestión inteligente de citas.",
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=80&auto=format&fit=crop",
    },
    {
      name: "Educación & Formación",
      description: "Tutores asistidos, generación de contenidos, captación.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop",
    },
  ],
};

export const services = {
  eyebrow: "Servicios",
  title: "Soluciones",
  titleAccent: "con Impacto",
  intro:
    "Cada solución se diseña para integrarse con tus herramientas y tu equipo. Siempre adaptada a tu caso.",
  items: [
    {
      number: "01",
      title: "Consultoría en IA",
      description:
        "Auditamos tus procesos, identificamos dónde la IA aporta valor real y trazamos un roadmap priorizado por impacto y complejidad.",
      tags: ["Audit", "Roadmap", "Estrategia"],
    },
    {
      number: "02",
      title: "Agentes de IA",
      description:
        "Agentes que atienden, califican leads, gestionan soporte, generan propuestas y ejecutan operaciones complejas con autonomía controlada.",
      tags: ["Atención", "Ventas", "Soporte"],
    },
    {
      number: "03",
      title: "Automatización de Procesos",
      description:
        "Conectamos sistemas, eliminamos tareas manuales y diseñamos workflows que liberan horas a tu equipo cada semana.",
      tags: ["Workflows", "Integraciones", "RPA"],
    },
    {
      number: "04",
      title: "Asistentes de Voz y Texto",
      description:
        "Asistentes integrados en tu web, WhatsApp, teléfono o canal interno, con tono y conocimiento específico de tu negocio.",
      tags: ["Voz", "Chat", "WhatsApp"],
    },
    {
      number: "05",
      title: "Captación y Seguimiento",
      description:
        "Sistemas que capturan leads, los nutren con secuencias inteligentes y mantienen el follow-up sin que se te escape ninguno.",
      tags: ["Leads", "CRM", "Nurturing"],
    },
    {
      number: "06",
      title: "Software a Medida",
      description:
        "Cuando una herramienta del mercado no encaja, lo construimos: dashboards, paneles internos, integraciones, micro-SaaS.",
      tags: ["Webapps", "APIs", "Dashboards"],
    },
  ],
};

export const gallery = {
  eyebrow: "Cómo Trabajamos por Dentro",
  title: "Construimos",
  titleAccent: "en Abierto",
  intro:
    "Auditorías, pizarras, dashboards, código. Así se ve el día a día del proceso.",
  bento: [
    { src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1600&q=80&auto=format&fit=crop", w: "wide" },
    { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&auto=format&fit=crop", w: "tall" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80&auto=format&fit=crop", w: "square" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", w: "wide" },
    { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&q=80&auto=format&fit=crop", w: "square" },
  ],
  marquee: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80&auto=format&fit=crop",
  ],
};

export const compare = {
  eyebrow: "La Diferencia",
  title: "¿Cuál es la Diferencia?",
  intro:
    "Sistemas que funcionan desde el primer día y mejoran con el tiempo. Comparamos lo que hacemos con lo que encontrarás en otras consultoras.",
  toggle: { withLabel: `Con ${site.name}`, withoutLabel: `Sin ${site.name}` },
  withUs: [
    { title: "Soluciones a Medida", description: "Diseñadas específicamente para tu caso, tu operativa y las herramientas que ya usas." },
    { title: "Enfoque Práctico", description: "Iteramos rápido y entregamos sistemas en producción real, no prototipos que se quedan en un cajón." },
    { title: "Comunicación Directa", description: "Hablas directamente con quien diseña y construye tu solución. Sin filtros ni intermediarios." },
    { title: "Tecnología Actualizada", description: "Stack moderno, modelos punteros e integraciones sólidas. Siempre al día con lo que funciona." },
    { title: "Soporte Continuo", description: "No desaparecemos tras la entrega. Seguimos contigo iterando y evolucionando el sistema." },
    { title: "Transparencia Total", description: "Si algo no encaja o no aporta valor, te lo decimos. Recomendamos lo que realmente sirve." },
  ],
  withoutUs: [
    { title: "Soluciones Genéricas", description: "De talla única, sin adaptar a la operativa real de tu negocio ni a tu equipo." },
    { title: "Solo Presentaciones", description: "Tecnología que impresiona en una reunión de ventas pero falla cuando llega a producción." },
    { title: "Muchos Intermediarios", description: "Las decisiones pasan por varias capas antes de llegar al equipo técnico que las ejecuta." },
    { title: "Tecnología Desactualizada", description: "Herramientas elegidas por comodidad o por partnerships, no por rendimiento real." },
    { title: "Soporte Limitado", description: "El proyecto se entrega, el equipo desaparece y te quedas solo con los problemas." },
    { title: "IA para Todo", description: "Se propone inteligencia artificial incluso donde una solución más simple sería mejor y más barata." },
  ],
};

export const process = {
  eyebrow: "Proceso",
  title: "Un Proceso",
  titleAccent: "Claro y Honesto",
  intro:
    "Sin reuniones interminables ni promesas vacías. Si vemos que no podemos ayudarte, te lo decimos.",
  steps: [
    {
      number: "01",
      title: "Auditoría Gratuita",
      description:
        "Una llamada de 30-45 minutos para entender tu caso, ver dónde estás y detectar oportunidades reales. Sin compromiso.",
      points: [
        "Mapa de procesos actuales",
        "Identificación de cuellos de botella",
        "Validación de encaje técnico",
      ],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Propuesta a Medida",
      description:
        "Si vemos que hay encaje, preparamos una propuesta clara con la solución recomendada, alcance, plazos y precio cerrado.",
      points: [
        "Solución técnica específica",
        "Alcance y entregables claros",
        "Plazos y precio cerrado",
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "Implementación",
      description:
        "Construimos, integramos y formamos a tu equipo. Te entregamos el sistema funcionando y listo para iterar.",
      points: [
        "Desarrollo iterativo",
        "Integración con tus herramientas",
        "Soporte y evolución continua",
      ],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop",
    },
    {
      number: "04",
      title: "Soporte y Evolución",
      description:
        "No desaparecemos. Monitorizamos, ajustamos y evolucionamos el sistema contigo a medida que tu negocio crece.",
      points: [
        "Monitorización continua",
        "Iteraciones y mejoras",
        "Escalado cuando lo necesites",
      ],
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80&auto=format&fit=crop",
    },
  ],
};

export const testimonials = {
  eyebrow: "Testimonios",
  title: "Lo que Dicen",
  titleAccent: "Nuestros Clientes",
  items: [
    {
      quote:
        "En dos semanas teníamos un agente atendiendo el 60% de las consultas de soporte. El equipo por fin puede centrarse en lo importante.",
      author: "Laura Méndez",
      role: "COO",
      company: "Klinik Health",
    },
    {
      quote:
        "Nos propusieron automatizar solo lo que tenía sentido. Nada de vender humo. El ROI se vio desde el primer mes.",
      author: "Marc Esteve",
      role: "CEO",
      company: "PropTech Solutions",
    },
    {
      quote:
        "El proceso fue muy claro: auditoría, propuesta y en producción en 3 semanas. Ahora gestionamos el doble de leads sin ampliar equipo.",
      author: "Ana Ruiz",
      role: "Directora Comercial",
      company: "Formacity",
    },
    {
      quote:
        "Lo que más valoro es que siguen ahí después de la entrega. No es un proyecto que se cierra, es una relación de mejora continua.",
      author: "Javier Blanco",
      role: "CTO",
      company: "Logística Express",
    },
    {
      quote:
        "Antes tardábamos horas en generar reportes. Ahora se generan solos cada lunes a las 8. Parece magia, pero es automatización bien hecha.",
      author: "Sandra Gil",
      role: "Head of Operations",
      company: "DataRetail",
    },
    {
      quote:
        "Nos dieron una visión honesta de lo que la IA podía y no podía hacer para nosotros. Esa transparencia es difícil de encontrar.",
      author: "Pablo Ferrer",
      role: "Fundador",
      company: "Estudio Nómada",
    },
  ],
};

export const faq = {
  eyebrow: "Preguntas Frecuentes",
  title: "¿Tienes Dudas?",
  items: [
    {
      question: "¿Qué tipo de empresas trabajan con vosotros?",
      answer:
        "Trabajamos con empresas de todos los tamaños, desde startups hasta compañías consolidadas. Lo importante no es el tamaño, sino que tengas procesos que puedan beneficiarse de la automatización o la inteligencia artificial.",
    },
    {
      question: "¿Cuánto tiempo tarda una implementación?",
      answer:
        "Depende del alcance, pero la mayoría de proyectos están en producción en 2-6 semanas. En la auditoría gratuita te damos una estimación realista para tu caso concreto.",
    },
    {
      question: "¿Necesito conocimientos técnicos para trabajar con vosotros?",
      answer:
        "No. Nos encargamos de toda la parte técnica. Tú solo necesitas contarnos cómo funciona tu negocio y qué problemas quieres resolver. Nosotros traducimos eso a tecnología.",
    },
    {
      question: "¿Qué pasa después de la entrega del proyecto?",
      answer:
        "No desaparecemos. Ofrecemos soporte continuo, monitorización y evolución del sistema. Si tu negocio cambia, adaptamos la solución contigo.",
    },
    {
      question: "¿Cuánto cuesta una solución a medida?",
      answer:
        "Cada proyecto es diferente. Siempre trabajamos con precio cerrado, sin sorpresas. En la auditoría gratuita evaluamos tu caso y te damos un presupuesto transparente.",
    },
    {
      question: "¿Qué diferencia hay entre vosotros y una consultora grande?",
      answer:
        "Hablas directamente con quien diseña y construye tu solución. Sin capas de gestión, sin intermediarios, sin presentaciones que no llevan a nada. Somos un equipo técnico que entrega resultados.",
    },
    {
      question: "¿La auditoría es realmente gratuita y sin compromiso?",
      answer:
        "Sí. Es una llamada de 30-45 minutos donde analizamos tu caso. Si vemos que podemos ayudarte, te hacemos una propuesta. Si no, te lo decimos con total honestidad.",
    },
  ],
};

export const finalCTA = {
  eyebrow: "Empieza Aquí",
  title: "No te Quedes",
  titleAccent: "Atrás",
  body:
    "Cada mes que esperas es un mes que tu equipo sigue perdiendo horas en tareas que la IA y la automatización pueden resolver.",
  cta: { label: "Solicitar Auditoría Gratuita", href: "/auditoria" },
  // URL pública de tu calendario de reservas (p. ej. GoHighLevel, Calendly...).
  calendarUrl: "PEGA_AQUI_TU_URL_DE_CALENDARIO",
};

export const auditoria = {
  eyebrow: "Auditoría Gratuita",
  title: "Cuéntanos",
  titleAccent: "tu Caso",
  body:
    "Rellena el formulario y agenda directamente tu consultoría de 30-45 minutos. Sin formularios infinitos, sin sales pitch.",
};

export const footer = {
  description:
    "Consultora de IA, automatización y desarrollo a medida. Sistemas útiles para empresas que quieren escalar mejor.",
  newsletter: {
    title: "Apúntate al Newsletter",
    body: "Una nota mensual con casos prácticos de IA y automatización en empresa. Sin spam, solo contenido que aporta.",
    placeholder: "tu@email.com",
    cta: "Suscribirse",
  },
  columns: [
    {
      title: "Servicios",
      links: [
        { label: "Consultoría en IA", href: "/#servicios" },
        { label: "Agentes", href: "/#servicios" },
        { label: "Automatización", href: "/#servicios" },
        { label: "Software a Medida", href: "/#servicios" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Nosotros", href: "/#nosotros" },
        { label: "Casos", href: "/#casos" },
        { label: "Proceso", href: "/#proceso" },
        { label: "Auditoría Gratuita", href: "/auditoria" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "WhatsApp", href: site.whatsappUrl },
        { label: site.email, href: `mailto:${site.email}` },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/TU_USUARIO/" },
        { label: "YouTube", href: "https://www.youtube.com/@TU_CANAL" },
        { label: "Instagram", href: "https://www.instagram.com/TU_USUARIO/" },
      ],
    },
  ],
};
