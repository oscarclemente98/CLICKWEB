import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import crypto from 'node:crypto'
import Stripe from 'stripe'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 3000
const DIST_DIR = path.join(__dirname, 'dist', 'client')
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'db.json')

// ─── Almacenamiento ───────────────────────────────────────────────────────────
fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ users: [], websites: [] }, null, 2))
}
function readDb() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) }
  catch { return { users: [], websites: [] } }
}
function writeDb(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2))
}

// ─── Rate limiting simple ─────────────────────────────────────────────────────
const rateLimitMap = new Map()
function rateLimit(maxReqs, windowMs) {
  return (req, res, next) => {
    const key = req.ip || 'unknown'
    const now = Date.now()
    const entry = rateLimitMap.get(key) || { count: 0, start: now }
    if (now - entry.start > windowMs) { entry.count = 1; entry.start = now }
    else entry.count++
    rateLimitMap.set(key, entry)
    if (entry.count > maxReqs) return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' })
    next()
  }
}
setInterval(() => rateLimitMap.clear(), 60 * 60 * 1000)

// ─── Helpers de usuario ───────────────────────────────────────────────────────
function normalizeEmail(email = '') { return String(email).trim().toLowerCase() }

function hashPassword(password = '') {
  const salt = 'clickweb-static-salt-v1'
  return crypto.pbkdf2Sync(String(password), salt, 100_000, 32, 'sha256').toString('hex')
}
function legacySha256(password = '') {
  return crypto.createHash('sha256').update(String(password)).digest('hex')
}
function sanitizeUser(user) {
  if (!user) return null
  const { passwordHash, ...rest } = user
  return rest
}

// ─── JWT con expiración ───────────────────────────────────────────────────────
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

function jwtSecret() { return process.env.JWT_SECRET || 'clickweb-dev-secret-change-in-prod' }
function sign(payload) { return crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url') }
function createToken(user) {
  const data = { id: user.id, email: user.email, plan: user.plan, exp: Date.now() + TOKEN_TTL_MS }
  const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url')
  return `${payload}.${sign(payload)}`
}
function verifyToken(token = '') {
  const [payload, sig] = String(token).split('.')
  if (!payload || !sig) return null
  const expected = sign(payload)
  try { if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null }
  catch { return null }
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (data.exp && Date.now() > data.exp) return null
    return data
  } catch { return null }
}
function getAuthUser(req) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) return null
  const payload = verifyToken(token)
  if (!payload?.id) return null
  const db = readDb()
  return db.users.find(u => u.id === payload.id) || null
}

// ─── Planes ───────────────────────────────────────────────────────────────────
function planLimits(plan) { return { free: 0, 'solo-web': 1, basico: 1, pro: 3, business: 999 }[plan] ?? 0 }
function canRefine(user)  { return user && ['pro', 'business'].includes(user.plan) }
function canPublish(user) { return user && ['basico', 'pro', 'business'].includes(user.plan) }

// ─── Stripe ───────────────────────────────────────────────────────────────────
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key)
}
function appUrl(req) { return process.env.APP_URL || `${req.protocol}://${req.get('host')}` }

// ─── HTML utils ───────────────────────────────────────────────────────────────
function escapeHtml(text = '') {
  return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c))
}
function shadeColor(color, percent) {
  const num = parseInt(String(color).replace('#', ''), 16)
  const r = (num >> 16) + percent
  const g = ((num >> 8) & 0x00ff) + percent
  const b = (num & 0x0000ff) + percent
  return `#${(0x1000000 + (Math.max(0, Math.min(255, r)) << 16) + (Math.max(0, Math.min(255, g)) << 8) + Math.max(0, Math.min(255, b))).toString(16).slice(1)}`
}
function cleanHtml(raw = '') {
  return raw.replace(/^```(?:html)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
function buildSeo(description, templateName, advanced = false) {
  const baseKeyword = String(description).split(' ').slice(0, 7).join(' ').trim() || templateName
  return {
    score: advanced ? 92 : 78,
    metaTitle: `${baseKeyword} | Página web profesional`,
    metaDescription: `Web profesional para ${String(description).toLowerCase()} con diseño moderno, responsive y preparada para conseguir clientes desde el primer día.`,
    keywords: [baseKeyword, templateName, 'web profesional', 'SEO local', 'clientes online'],
    faq: advanced
      ? ['¿Cómo consigo más clientes con esta web?', '¿Puedo conectar productos o reservas más adelante?', '¿Qué páginas debo crear para posicionar mejor en Google?']
      : ['¿Puedo editar esta web más adelante?', '¿Está optimizada para móvil?'],
    recommendations: advanced
      ? ['Crear páginas separadas por servicio o categoría', 'Añadir 3 artículos de blog con intención de compra', 'Reforzar testimonios y preguntas frecuentes con palabras clave']
      : ['Usar un H1 claro con tu servicio principal', 'Añadir una sección FAQ visible', 'Incluir una llamada a la acción en cada bloque'],
  }
}

// ─── Demo HTML ────────────────────────────────────────────────────────────────
function generateDemoHtml({ description, templateName, accent = '#7c3aed', isEcommerce = false }) {
  const safe = escapeHtml(description || templateName)
  const darker = shadeColor(accent, -18)
  const lighter = shadeColor(accent, 85)
  const cards = isEcommerce ? [
    ['Colección destacada', 'Tarjetas de producto premium, CTA claros y confianza visual desde el primer scroll.'],
    ['Preparada para Shopify', 'Estructura compatible para que después conectes productos, colecciones y botones de compra.'],
    ['Conversión real', 'Beneficios, reseñas, envíos y garantías listos para vender mejor.'],
  ] : [
    ['Captación de clientes', 'Textos claros, llamadas a la acción visibles y estructura pensada para convertir.'],
    ['Diseño profesional', 'Responsive, limpio y con sensación premium desde la primera visita.'],
    ['SEO preparado', 'Títulos, bloques y contenido listos para salir bien posicionados.'],
  ]
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${safe} | Web profesional</title><meta name="description" content="Web profesional para ${safe} con diseño moderno y responsive."/><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{colors:{brand:'${accent}',brandDark:'${darker}',brandSoft:'${lighter}'},boxShadow:{glow:'0 30px 80px rgba(2,6,23,.18)'}}}}</script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><style>body{font-family:Inter,sans-serif}.gridbg{background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.09) 1px,transparent 0);background-size:24px 24px}</style></head><body class="bg-slate-950 text-white"><header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"><div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><div class="text-xl font-black tracking-tight">${templateName}</div><nav class="hidden gap-6 text-sm text-white/70 md:flex"><a href="#">Inicio</a><a href="#">Servicios</a><a href="#">Reseñas</a><a href="#">Contacto</a></nav><a class="rounded-full px-4 py-2 text-sm font-bold text-white" style="background:${accent}">Quiero presupuesto</a></div></header><section class="relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div><div class="absolute inset-0 gridbg opacity-30"></div><div class="absolute -left-24 top-16 h-80 w-80 rounded-full blur-3xl opacity-30" style="background:${accent}"></div><div class="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-32"><div><div class="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">Vista previa · activa la IA con un plan</div><h1 class="max-w-3xl text-5xl font-black leading-tight md:text-7xl">${safe}</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-white/70">Una demo rápida para enseñarte cómo puede quedar tu web. Si desbloqueas un plan, podrás editarla, mejorar el SEO y dejarla lista para publicar.</p><div class="mt-8 flex flex-wrap gap-3"><a class="rounded-2xl px-6 py-4 font-bold text-white" style="background:${accent}">Crear mi web</a><a class="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white">Ver servicios</a></div></div><div class="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"><div class="rounded-[1.6rem] bg-white p-5 text-slate-900"><div class="mb-4 flex items-center justify-between"><div><p class="text-sm text-slate-500">Vista rápida</p><h2 class="text-2xl font-black">${templateName}</h2></div><div class="rounded-full px-3 py-1 text-xs font-bold text-white" style="background:${accent}">Demo</div></div><div class="grid gap-3 md:grid-cols-2">${cards.map(([t, x]) => `<div class="rounded-2xl bg-slate-50 p-4"><p class="font-black">${t}</p><p class="mt-2 text-sm leading-6 text-slate-500">${x}</p></div>`).join('')}</div></div></div></div></section><section class="bg-white text-slate-900"><div class="mx-auto max-w-6xl px-6 py-20"><div class="grid gap-5 md:grid-cols-3">${cards.map(([t, x]) => `<div class="rounded-[1.75rem] border border-slate-200 p-6 shadow-sm"><p class="text-lg font-black">${t}</p><p class="mt-3 leading-7 text-slate-500">${x}</p></div>`).join('')}</div></div></section></body></html>`
}

// ─── OpenAI ───────────────────────────────────────────────────────────────────
async function generateWithOpenAI({ description, template = 'Web profesional', advanced = false, instruction = '', currentHtml = '' }) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    if (currentHtml) return currentHtml.replace('</body>', `<section style="position:fixed;bottom:20px;left:20px;right:20px;padding:14px 18px;border-radius:18px;background:#111827;color:#fff;font-family:Inter,sans-serif;z-index:99999">Mejora solicitada: ${escapeHtml(instruction)}</section></body>`)
    return generateDemoHtml({ description, templateName: template, accent: '#7c3aed', isEcommerce: /tienda|ecommerce|shop|calcetin|ropa/i.test(description) })
  }
  const prompt = currentHtml
    ? `Tienes este HTML:\n${currentHtml}\n\nAplica esta mejora: ${instruction}. Devuelve SOLO HTML completo válido con Tailwind CDN, en español, responsive y premium. Sin explicaciones ni markdown.`
    : `Crea una web completa en HTML para: ${description}. Diseño moderno, responsive, secciones completas, textos profesionales, CTA, beneficios, reseñas, contacto, FAQ y SEO base. SOLO HTML válido, sin markdown, sin explicaciones. ${advanced ? 'Hazla muy premium y comercial.' : 'Hazla bonita y clara.'}`
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un diseñador web premium. Devuelve solo HTML completo válido, en español, con Tailwind CDN y responsive. Nunca uses markdown ni explicaciones.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
    }),
  })
  if (!res.ok) { const text = await res.text(); throw new Error(`OpenAI error ${res.status}: ${text.slice(0, 200)}`) }
  const data = await res.json()
  return cleanHtml(data.choices?.[0]?.message?.content || '')
}

// ─── Webhook de Stripe (necesita raw body, antes del json parser) ─────────────
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return res.status(400).json({ error: 'STRIPE_WEBHOOK_SECRET no configurado' })
  let event
  try { event = getStripe().webhooks.constructEvent(req.body, sig, secret) }
  catch (err) { console.error('Webhook error:', err.message); return res.status(400).json({ error: err.message }) }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.payment_status === 'paid' || session.status === 'complete') {
      const { plan, userId, websiteId } = session.metadata || {}
      if (plan && userId) {
        const db = readDb()
        const idx = db.users.findIndex(u => u.id === userId)
        if (idx >= 0) db.users[idx] = { ...db.users[idx], plan, updatedAt: new Date().toISOString() }
        if (websiteId) {
          const widx = db.websites.findIndex(w => w.id === websiteId)
          if (widx >= 0) db.websites[widx] = { ...db.websites[widx], plan, userId, status: plan === 'solo-web' ? db.websites[widx].status : 'published', publishedUrl: plan === 'solo-web' ? db.websites[widx].publishedUrl : `/preview/${websiteId}`, updatedAt: new Date().toISOString() }
        }
        writeDb(db)
        console.log(`Webhook: plan ${plan} activado para user ${userId}`)
      }
    }
  }
  res.json({ received: true })
})

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Auth ─────────────────────────────────────────────────────────────────────
app.post('/api/register', rateLimit(10, 60_000), (req, res) => {
  const { name, email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })
  if (String(password).length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  const db = readDb()
  const normalized = normalizeEmail(email)
  if (db.users.find(u => u.email === normalized)) return res.status(400).json({ error: 'Ya existe una cuenta con este email' })
  const now = new Date().toISOString()
  const user = { id: crypto.randomUUID(), name: String(name || '').trim(), email: normalized, passwordHash: hashPassword(password), hashVersion: 'pbkdf2', plan: 'free', createdAt: now, updatedAt: now }
  db.users.push(user)
  writeDb(db)
  res.json({ token: createToken(user), user: sanitizeUser(user) })
})

app.post('/api/login', rateLimit(20, 60_000), (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })
  const db = readDb()
  const normalized = normalizeEmail(email)
  const userIdx = db.users.findIndex(u => u.email === normalized)
  if (userIdx < 0) return res.status(401).json({ error: 'Credenciales incorrectas' })
  const user = db.users[userIdx]
  let valid = false
  if (!user.hashVersion || user.hashVersion === 'sha256') {
    if (user.passwordHash === legacySha256(password)) {
      valid = true
      db.users[userIdx] = { ...user, passwordHash: hashPassword(password), hashVersion: 'pbkdf2', updatedAt: new Date().toISOString() }
      writeDb(db)
    }
  } else {
    valid = user.passwordHash === hashPassword(password)
  }
  if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' })
  res.json({ token: createToken(db.users[userIdx]), user: sanitizeUser(db.users[userIdx]) })
})

app.get('/api/me', (req, res) => {
  const user = getAuthUser(req)
  res.json({ user: sanitizeUser(user) })
})

// ─── Webs ─────────────────────────────────────────────────────────────────────
app.get('/api/websites', (req, res) => {
  const user = getAuthUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })
  const db = readDb()
  const websites = db.websites.filter(w => w.userId === user.id).map(({ html, ...rest }) => rest).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
  res.json({ websites })
})

app.get('/api/websites/:id', (req, res) => {
  const db = readDb()
  const website = db.websites.find(w => w.id === req.params.id)
  if (!website) return res.status(404).json({ error: 'Web no encontrada' })
  const user = getAuthUser(req)
  const isOwner = !!user && website.userId === user.id
  const isPublic = website.status === 'published' || !website.userId
  if (!isOwner && !isPublic) return res.status(403).json({ error: 'No autorizado' })
  res.json(website)
})

app.post('/api/save-website', (req, res) => {
  const { id, description, html, template, seo } = req.body || {}
  if (!id || !description || !html) return res.status(400).json({ error: 'ID, descripción y HTML requeridos' })
  if (html.length > 1_500_000) return res.status(413).json({ error: 'HTML demasiado grande' })
  const user = getAuthUser(req)
  const db = readDb()
  const existingIndex = db.websites.findIndex(w => w.id === id)
  const existing = existingIndex >= 0 ? db.websites[existingIndex] : null
  const owner = user?.id || existing?.userId || null
  if (owner && user && existing?.userId && existing.userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  if (user && !existing && user.plan !== 'free') {
    const owned = db.websites.filter(w => w.userId === user.id)
    if (owned.length >= planLimits(user.plan)) return res.status(403).json({ error: 'Has alcanzado el límite de tu plan' })
  }
  const record = { id, description, html, template, seo, createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString(), status: existing?.status || 'draft', plan: existing?.plan || user?.plan || 'free', userId: owner, publishedUrl: existing?.publishedUrl || null }
  if (existingIndex >= 0) db.websites[existingIndex] = record
  else db.websites.push(record)
  writeDb(db)
  res.json({ success: true, website: { ...record, html: undefined } })
})

app.delete('/api/websites/:id', (req, res) => {
  const user = getAuthUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })
  const db = readDb()
  const idx = db.websites.findIndex(w => w.id === req.params.id)
  if (idx < 0) return res.status(404).json({ error: 'Web no encontrada' })
  if (db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  db.websites.splice(idx, 1)
  writeDb(db)
  res.json({ success: true })
})

app.post('/api/publish', (req, res) => {
  const user = getAuthUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })
  if (!canPublish(user)) return res.status(403).json({ error: 'Publicar es una función de los planes mensuales (Básico, Pro o Business)' })
  const { id } = req.body || {}
  if (!id) return res.status(400).json({ error: 'ID de web requerido' })
  const db = readDb()
  const idx = db.websites.findIndex(w => w.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Web no encontrada' })
  if (db.websites[idx].userId && db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  db.websites[idx] = { ...db.websites[idx], userId: user.id, plan: user.plan, status: 'published', publishedUrl: `/preview/${id}`, updatedAt: new Date().toISOString() }
  writeDb(db)
  res.json({ success: true, url: `/preview/${id}` })
})

// ─── Generación ───────────────────────────────────────────────────────────────
app.post('/api/generate-website', rateLimit(30, 60_000), async (req, res) => {
  const { description, template = 'Web profesional', advanced = false } = req.body || {}
  if (!description) return res.status(400).json({ error: 'Descripción requerida' })
  if (String(description).length > 500) return res.status(400).json({ error: 'Descripción demasiado larga (máx. 500 caracteres)' })
  try {
    const isEcommerce = /tienda|ecommerce|shop|calcetin|ropa|moda|product/i.test(description)
    const html = advanced ? await generateWithOpenAI({ description, template, advanced: true }) : generateDemoHtml({ description, templateName: template, accent: '#7c3aed', isEcommerce })
    const id = crypto.randomUUID()
    const seo = buildSeo(description, template, advanced)
    const db = readDb()
    db.websites.push({ id, description, html, template, seo, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'draft', plan: 'free', userId: null, publishedUrl: null })
    writeDb(db)
    res.json({ id, html, seo })
  } catch (err) {
    console.error('generate-website error:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'No se pudo generar la web' })
  }
})

app.post('/api/refine-website', rateLimit(20, 60_000), async (req, res) => {
  const user = getAuthUser(req)
  if (!canRefine(user)) return res.status(403).json({ error: 'Editar con IA es una función de Pro y Business' })
  const { id, instruction } = req.body || {}
  if (!id || !instruction) return res.status(400).json({ error: 'ID e instrucción requeridos' })
  if (String(instruction).length > 300) return res.status(400).json({ error: 'Instrucción demasiado larga (máx. 300 caracteres)' })
  const db = readDb()
  const idx = db.websites.findIndex(w => w.id === id)
  if (idx < 0) return res.status(404).json({ error: 'Web no encontrada' })
  if (db.websites[idx].userId && db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  try {
    const html = await generateWithOpenAI({ description: db.websites[idx].description, template: db.websites[idx].template || 'Web profesional', advanced: true, instruction, currentHtml: db.websites[idx].html })
    const seo = buildSeo(db.websites[idx].description, db.websites[idx].template || 'Web profesional', true)
    db.websites[idx] = { ...db.websites[idx], html, seo, updatedAt: new Date().toISOString(), plan: user.plan, userId: user.id }
    writeDb(db)
    res.json({ success: true, html, seo })
  } catch (err) {
    console.error('refine-website error:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'No se pudo refinar la web' })
  }
})

// ─── Stripe Checkout ──────────────────────────────────────────────────────────
app.post('/api/create-checkout', rateLimit(10, 60_000), async (req, res) => {
  const { plan, websiteId } = req.body || {}
  if (!['solo-web', 'basico', 'pro', 'business'].includes(plan)) return res.status(400).json({ error: 'Plan no válido' })
  const user = getAuthUser(req)
  if (plan !== 'solo-web' && !user) return res.status(401).json({ error: 'Inicia sesión para activar un plan mensual' })
  try {
    const stripe = getStripe()
    const baseUrl = appUrl(req)
    const priceEnv = { 'solo-web': 'STRIPE_PRICE_SOLO', basico: 'STRIPE_PRICE_BASICO', pro: 'STRIPE_PRICE_PRO', business: 'STRIPE_PRICE_BUSINESS' }
    const priceId = process.env[priceEnv[plan]]
    if (!priceId) return res.status(500).json({ error: `Precio de Stripe no configurado para el plan ${plan}` })
    const highFee = { basico: 3000, pro: 3000, business: 3000 } // Cuota de alta fija: 30€ en todos los planes
    const session = plan === 'solo-web'
      ? await stripe.checkout.sessions.create({ mode: 'payment', line_items: [{ price: priceId, quantity: 1 }], success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=solo-web`, cancel_url: `${baseUrl}/checkout/cancel`, customer_email: user?.email, metadata: { plan, websiteId: websiteId || '', userId: user?.id || '' } })
      : await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [{ price_data: { currency: 'eur', product_data: { name: 'Cuota de alta — creación de web' }, unit_amount: highFee[plan] }, quantity: 1 }, { price: priceId, quantity: 1 }], success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`, cancel_url: `${baseUrl}/checkout/cancel`, customer_email: user?.email, metadata: { plan, websiteId: websiteId || '', userId: user?.id || '' } })
    res.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('create-checkout error:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'No se pudo crear el checkout' })
  }
})

app.post('/api/verify-checkout', rateLimit(20, 60_000), async (req, res) => {
  const { sessionId } = req.body || {}
  if (!sessionId) return res.status(400).json({ error: 'sessionId requerido' })
  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (!(session.payment_status === 'paid' || session.status === 'complete')) return res.status(409).json({ error: 'El pago aún no figura como completado' })
    const plan = session.metadata?.plan || 'basico'
    const { websiteId, userId } = session.metadata || {}
    const db = readDb()
    let user = null
    if (userId) {
      const idx = db.users.findIndex(u => u.id === userId)
      if (idx >= 0) { db.users[idx] = { ...db.users[idx], plan, updatedAt: new Date().toISOString() }; user = db.users[idx] }
    }
    if (websiteId) {
      const widx = db.websites.findIndex(w => w.id === websiteId)
      if (widx >= 0) db.websites[widx] = { ...db.websites[widx], plan, userId: userId || db.websites[widx].userId || null, status: plan === 'solo-web' ? (db.websites[widx].status || 'draft') : 'published', updatedAt: new Date().toISOString(), publishedUrl: plan === 'solo-web' ? db.websites[widx].publishedUrl || null : `/preview/${websiteId}` }
    }
    writeDb(db)
    res.json({ success: true, user: sanitizeUser(user) })
  } catch (err) {
    console.error('verify-checkout error:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'No se pudo validar el pago' })
  }
})

// ─── Frontend ─────────────────────────────────────────────────────────────────
app.use(express.static(DIST_DIR, { index: false }))
app.get('*', (_req, res) => { res.sendFile(path.join(DIST_DIR, 'index.html')) })

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`ClickWeb corriendo en http://localhost:${PORT}`)
  if (!process.env.JWT_SECRET) console.warn('AVISO: JWT_SECRET no definido — usando valor por defecto (solo desarrollo)')
  if (!process.env.OPENAI_API_KEY) console.warn('AVISO: OPENAI_API_KEY no definido — IA premium desactivada')
  if (!process.env.STRIPE_SECRET_KEY) console.warn('AVISO: STRIPE_SECRET_KEY no definido — pagos desactivados')
  if (!process.env.STRIPE_WEBHOOK_SECRET) console.warn('AVISO: STRIPE_WEBHOOK_SECRET no definido — webhook sin protección')
})
