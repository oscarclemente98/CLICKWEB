export type TemplateKey =
  | 'ecommerce-fashion'
  | 'ecommerce-socks'
  | 'ecommerce-jewelry'
  | 'ecommerce-cosmetics'
  | 'ecommerce-fitness'
  | 'restaurante'
  | 'cafeteria'
  | 'barberia'
  | 'belleza'
  | 'clinica'
  | 'dental'
  | 'fisioterapia'
  | 'gimnasio'
  | 'abogado'
  | 'asesoria'
  | 'agencia'
  | 'consultoria'
  | 'freelance'
  | 'portfolio'
  | 'coach'
  | 'empresa'
  | 'inmobiliaria'
  | 'eventos'
  | 'educacion'

export interface TemplateDef {
  key: TemplateKey
  name: string
  category: string
  tagline: string
  emoji: string
  accent: string
  tone?: string
  commerce?: boolean
}

export const templates: TemplateDef[] = [
  { key: 'ecommerce-fashion', name: 'Tienda de moda', category: 'Ecommerce', tagline: 'Colecciones, banners y fichas de producto con look premium', emoji: '🛍️', accent: '#7c3aed', tone: 'editorial', commerce: true },
  { key: 'ecommerce-socks', name: 'Tienda de calcetines', category: 'Ecommerce', tagline: 'Perfecta para marcas nicho con catálogo visual y estilo Shopify-ready', emoji: '🧦', accent: '#6d28d9', tone: 'playful', commerce: true },
  { key: 'ecommerce-jewelry', name: 'Joyería', category: 'Ecommerce', tagline: 'Minimal, elegante y centrada en producto y confianza', emoji: '💍', accent: '#b45309', tone: 'luxury', commerce: true },
  { key: 'ecommerce-cosmetics', name: 'Cosmética', category: 'Ecommerce', tagline: 'Texturas suaves, beneficios claros y conversión beauty', emoji: '💄', accent: '#db2777', tone: 'soft', commerce: true },
  { key: 'ecommerce-fitness', name: 'Suplementos fitness', category: 'Ecommerce', tagline: 'Catálogo potente, beneficios directos y visual muy enérgico', emoji: '🏋️', accent: '#16a34a', tone: 'bold', commerce: true },
  { key: 'restaurante', name: 'Restaurante', category: 'Negocio local', tagline: 'Carta, reservas, testimonios y presencia local', emoji: '🍽️', accent: '#ea580c', tone: 'warm' },
  { key: 'cafeteria', name: 'Cafetería', category: 'Negocio local', tagline: 'Ambiente acogedor, menú y captación por WhatsApp', emoji: '☕', accent: '#92400e', tone: 'cozy' },
  { key: 'barberia', name: 'Barbería', category: 'Negocio local', tagline: 'Visual potente, reservas y autoridad de marca', emoji: '💈', accent: '#0f172a', tone: 'masculine' },
  { key: 'belleza', name: 'Peluquería y belleza', category: 'Negocio local', tagline: 'Look aspiracional, servicios y llamadas a reservar', emoji: '✨', accent: '#ec4899', tone: 'beauty' },
  { key: 'clinica', name: 'Clínica', category: 'Salud', tagline: 'Confianza, equipo, tratamientos y captación cuidada', emoji: '🩺', accent: '#0891b2', tone: 'trust' },
  { key: 'dental', name: 'Clínica dental', category: 'Salud', tagline: 'Diseño limpio, autoridad y formularios listos para captar', emoji: '🦷', accent: '#0ea5e9', tone: 'clinical' },
  { key: 'fisioterapia', name: 'Fisioterapia', category: 'Salud', tagline: 'Servicios, enfoque humano y mensajes de confianza', emoji: '🧘', accent: '#0f766e', tone: 'calm' },
  { key: 'gimnasio', name: 'Gimnasio', category: 'Wellness', tagline: 'Planes, transformación, energía y pruebas sociales', emoji: '🔥', accent: '#16a34a', tone: 'sport' },
  { key: 'abogado', name: 'Abogado', category: 'Profesional', tagline: 'Autoridad, seriedad y captación de consultas', emoji: '⚖️', accent: '#1d4ed8', tone: 'formal' },
  { key: 'asesoria', name: 'Asesoría', category: 'Profesional', tagline: 'Servicios claros, confianza y orientación a leads', emoji: '📊', accent: '#2563eb', tone: 'formal' },
  { key: 'agencia', name: 'Agencia', category: 'Empresa', tagline: 'Servicios premium, casos y posicionamiento fuerte', emoji: '🚀', accent: '#4f46e5', tone: 'premium' },
  { key: 'consultoria', name: 'Consultoría', category: 'Empresa', tagline: 'Propuesta sólida, credibilidad y funnel B2B', emoji: '🧠', accent: '#4338ca', tone: 'strategic' },
  { key: 'freelance', name: 'Freelance', category: 'Marca personal', tagline: 'Servicios, portfolio y contacto directo', emoji: '🧑‍💻', accent: '#7c3aed', tone: 'clean' },
  { key: 'portfolio', name: 'Portfolio creativo', category: 'Marca personal', tagline: 'Visual, elegante y perfecto para mostrar trabajos', emoji: '🎨', accent: '#7c2d12', tone: 'creative' },
  { key: 'coach', name: 'Coach / mentor', category: 'Marca personal', tagline: 'Oferta clara, autoridad y CTA de sesión', emoji: '🪄', accent: '#8b5cf6', tone: 'inspiring' },
  { key: 'empresa', name: 'Empresa de servicios', category: 'Corporativa', tagline: 'Web seria, limpia y pensada para vender', emoji: '🏢', accent: '#1e293b', tone: 'corporate' },
  { key: 'inmobiliaria', name: 'Inmobiliaria', category: 'Sectorial', tagline: 'Propiedades, confianza y captación de contactos', emoji: '🏠', accent: '#0f766e', tone: 'elevated' },
  { key: 'eventos', name: 'Eventos y bodas', category: 'Sectorial', tagline: 'Elegante, emocional y muy visual', emoji: '🎉', accent: '#be185d', tone: 'romantic' },
  { key: 'educacion', name: 'Academia / formación', category: 'Sectorial', tagline: 'Cursos, metodología y captación de alumnos', emoji: '📚', accent: '#2563eb', tone: 'academic' },
]

export function buildSeo(description: string, templateName: string, advanced = false) {
  const baseKeyword = description.split(' ').slice(0, 7).join(' ').trim() || templateName
  return {
    score: advanced ? 92 : 78,
    metaTitle: `${baseKeyword} | Web profesional creada con ClickWeb`,
    metaDescription: `Web profesional para ${description.toLowerCase()} con diseño moderno, responsive y preparada para conseguir clientes desde el primer día.`,
    keywords: [baseKeyword, templateName, 'web profesional', 'SEO local', 'clientes online'],
    faq: advanced
      ? [
          '¿Cómo consigo más clientes con esta web?',
          '¿Puedo conectar productos o reservas más adelante?',
          '¿Qué páginas debo crear para posicionar mejor en Google?',
        ]
      : ['¿Puedo editar esta web más adelante?', '¿Está optimizada para móvil?'],
    recommendations: advanced
      ? [
          'Crear páginas separadas por servicio o categoría',
          'Añadir 3 artículos de blog con intención de compra',
          'Reforzar testimonios y preguntas frecuentes con palabras clave',
        ]
      : [
          'Usar un H1 claro con tu servicio principal',
          'Añadir una sección FAQ visible',
          'Incluir una llamada a la acción en cada bloque',
        ],
  }
}

export function generateDemoHtml({
  description,
  templateName,
  accent,
  isEcommerce,
}: {
  description: string
  templateName: string
  accent: string
  isEcommerce?: boolean
}) {
  const safe = escapeHtml(description || templateName)
  const darker = shadeColor(accent, -18)
  const lighter = shadeColor(accent, 85)
  const cards = isEcommerce
    ? [
        ['Colección destacada', 'Tarjetas de producto premium, CTA claros y confianza visual desde el primer scroll.'],
        ['Preparada para Shopify', 'Estructura compatible para que después conectes productos, colecciones y botones de compra.'],
        ['Conversión real', 'Beneficios, reseñas, envíos y garantías listos para vender mejor.'],
      ]
    : [
        ['Captación de clientes', 'Textos claros, llamadas a la acción visibles y estructura pensada para convertir.'],
        ['Diseño profesional', 'Responsive, limpio y con sensación premium desde la primera visita.'],
        ['SEO preparado', 'Títulos, bloques y contenido listos para salir bien posicionados.'],
      ]

  return `<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${safe} | ClickWeb</title><meta name="description" content="${safe}" /><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{colors:{brand:'${accent}',brandDark:'${darker}',brandSoft:'${lighter}'},boxShadow:{glow:'0 30px 80px rgba(2,6,23,.18)'}}}}</script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><style>body{font-family:Inter,sans-serif}.gridbg{background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.09) 1px,transparent 0);background-size:24px 24px}</style></head><body class="bg-slate-950 text-white"><header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"><div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><div class="text-xl font-black tracking-tight">${templateName}</div><nav class="hidden gap-6 text-sm text-white/70 md:flex"><a href="#">Inicio</a><a href="#">Servicios</a><a href="#">Reseñas</a><a href="#">Contacto</a></nav><a class="rounded-full px-4 py-2 text-sm font-bold text-white shadow-glow" style="background:${accent}">Quiero presupuesto</a></div></header><section class="relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div><div class="absolute inset-0 gridbg opacity-30"></div><div class="absolute -left-24 top-16 h-80 w-80 rounded-full blur-3xl opacity-30" style="background:${accent}"></div><div class="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl opacity-20" style="background:${lighter}"></div><div class="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-32"><div><div class="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">Demo de ClickWeb · vista previa rápida</div><h1 class="max-w-3xl text-5xl font-black leading-tight md:text-7xl">${safe}</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-white/70">Una demo rápida para enseñarte cómo puede quedar tu web. Si desbloqueas un plan, podrás editarla, mejorar el SEO y dejarla lista para publicar.</p><div class="mt-8 flex flex-wrap gap-3"><a class="rounded-2xl px-6 py-4 font-bold text-white shadow-glow" style="background:${accent}">Crear mi web</a><a class="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white">Ver servicios</a></div><div class="mt-8 grid gap-3 sm:grid-cols-3">${['Responsive','SEO listo','Diseño premium'].map(item=>`<div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">${item}</div>`).join('')}</div></div><div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-glow"><div class="rounded-[1.6rem] bg-white p-5 text-slate-900"><div class="mb-4 flex items-center justify-between"><div><p class="text-sm text-slate-500">Vista rápida</p><h2 class="text-2xl font-black">${templateName}</h2></div><div class="rounded-full px-3 py-1 text-xs font-bold text-white" style="background:${accent}">Demo</div></div><div class="grid gap-3 md:grid-cols-2">${cards.map(([t,x])=>`<div class="rounded-2xl bg-slate-50 p-4"><p class="font-black">${t}</p><p class="mt-2 text-sm leading-6 text-slate-500">${x}</p></div>`).join('')}</div><div class="mt-4 rounded-2xl bg-slate-950 p-4 text-white"><p class="text-sm text-white/60">Lo que desbloqueas al pagar</p><p class="mt-2 text-lg font-black">Edición con IA, panel privado, SEO avanzado y publicación.</p></div></div></div></div></section><section class="bg-white text-slate-900"><div class="mx-auto max-w-6xl px-6 py-20"><div class="grid gap-5 md:grid-cols-3">${cards.map(([t,x])=>`<div class="rounded-[1.75rem] border border-slate-200 p-6 shadow-sm"><p class="text-lg font-black">${t}</p><p class="mt-3 leading-7 text-slate-500">${x}</p></div>`).join('')}</div><div class="mt-10 rounded-[2rem] bg-slate-950 px-6 py-7 text-white"><div class="grid gap-5 md:grid-cols-3"><div><p class="text-3xl font-black">+1.000</p><p class="text-sm text-white/60">demos generadas</p></div><div><p class="text-3xl font-black">24/7</p><p class="text-sm text-white/60">captación online</p></div><div><p class="text-3xl font-black">Shopify-ready</p><p class="text-sm text-white/60">en plantillas ecommerce</p></div></div></div></div></section></body></html>`
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char))
}

function shadeColor(color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16)
  const r = (num >> 16) + percent
  const g = ((num >> 8) & 0x00ff) + percent
  const b = (num & 0x0000ff) + percent
  return `#${(0x1000000 + (Math.max(0, Math.min(255, r)) << 16) + (Math.max(0, Math.min(255, g)) << 8) + Math.max(0, Math.min(255, b))).toString(16).slice(1)}`
}
