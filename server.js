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
const DIST_CLIENT = path.join(__dirname, 'dist', 'client')
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'db.json')

fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ users: [], websites: [] }, null, 2))
}
function readDb() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) }
  catch { return { users: [], websites: [] } }
}
function writeDb(db) { fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2)) }

const rateLimitMap = new Map()
function rateLimit(maxReqs, windowMs) {
  return (req, res, next) => {
    const key = req.ip || 'unknown'
    const now = Date.now()
    const entry = rateLimitMap.get(key) || { count: 0, start: now }
    if (now - entry.start > windowMs) { entry.count = 1; entry.start = now }
    else entry.count++
    rateLimitMap.set(key, entry)
    if (entry.count > maxReqs) return res.status(429).json({ error: 'Demasiadas peticiones.' })
    next()
  }
}
setInterval(() => rateLimitMap.clear(), 60 * 60 * 1000)

function normalizeEmail(e = '') { return String(e).trim().toLowerCase() }
function hashPassword(p = '') {
  return crypto.pbkdf2Sync(String(p), 'clickweb-salt-v1', 100_000, 32, 'sha256').toString('hex')
}
function legacySha256(p = '') { return crypto.createHash('sha256').update(String(p)).digest('hex') }
function sanitizeUser(u) { if (!u) return null; const { passwordHash, ...r } = u; return r }
function jwtSecret() { return process.env.JWT_SECRET || 'clickweb-dev-secret' }
function sign(payload) { return crypto.createHmac('sha256', jwtSecret()).update(payload).digest('base64url') }
function createToken(user) {
  const data = { id: user.id, email: user.email, plan: user.plan, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 }
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
  return `${payload}.${sign(payload)}`
}
function verifyToken(token = '') {
  const [payload, sig] = String(token).split('.')
  if (!payload || !sig) return null
  try { if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sign(payload)))) return null } catch { return null }
  try { const d = JSON.parse(Buffer.from(payload, 'base64url').toString()); if (d.exp && Date.now() > d.exp) return null; return d } catch { return null }
}
function getAuthUser(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '')
  if (!token) return null
  const payload = verifyToken(token)
  if (!payload?.id) return null
  return readDb().users.find(u => u.id === payload.id) || null
}
function planLimits(plan) { return { free: 0, 'solo-web': 1, basico: 1, pro: 3, business: 999 }[plan] ?? 0 }
function canRefine(u) { return u && ['pro', 'business'].includes(u.plan) }
function canPublish(u) { return u && ['basico', 'pro', 'business'].includes(u.plan) }
function getStripe() { const k = process.env.STRIPE_SECRET_KEY; if (!k) throw new Error('STRIPE_SECRET_KEY no configurada'); return new Stripe(k) }
function appUrl(req) { return process.env.APP_URL || `${req.protocol}://${req.get('host')}` }
function escapeHtml(t = '') { return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c)) }
function shadeColor(color, pct) {
  const n = parseInt(String(color).replace('#', ''), 16)
  const clamp = v => Math.max(0, Math.min(255, v))
  return `#${(0x1000000 + (clamp((n >> 16) + pct) << 16) + (clamp(((n >> 8) & 0xff) + pct) << 8) + clamp((n & 0xff) + pct)).toString(16).slice(1)}`
}
function cleanHtml(raw = '') { return raw.replace(/^```(?:html)?\s*/i, '').replace(/\s*```\s*$/i, '').trim() }
function buildSeo(description, templateName, advanced = false) {
  const kw = String(description).split(' ').slice(0, 7).join(' ').trim() || templateName
  return {
    score: advanced ? 92 : 78,
    metaTitle: `${kw} | Página web profesional`,
    metaDescription: `Web profesional para ${String(description).toLowerCase()} con diseño moderno y responsive.`,
    keywords: [kw, templateName, 'web profesional', 'SEO local'],
    faq: advanced ? ['¿Cómo consigo más clientes?', '¿Puedo conectar productos?'] : ['¿Puedo editar después?', '¿Es responsive?'],
    recommendations: advanced ? ['Crear páginas por servicio', 'Añadir blog SEO'] : ['H1 claro', 'Sección FAQ', 'CTA visible'],
  }
}
function generateDemoHtml({ description, templateName, accent = '#7c3aed', isEcommerce = false }) {
  const safe = escapeHtml(description || templateName)
  const darker = shadeColor(accent, -18)
  const lighter = shadeColor(accent, 85)
  const cards = isEcommerce ? [
    ['Colección destacada', 'Tarjetas de producto premium y CTA claros.'],
    ['Preparada para Shopify', 'Estructura compatible para conectar productos.'],
    ['Conversión real', 'Beneficios, reseñas y garantías listos para vender.'],
  ] : [
    ['Captación de clientes', 'Textos claros y estructura pensada para convertir.'],
    ['Diseño profesional', 'Responsive, limpio y con sensación premium.'],
    ['SEO preparado', 'Títulos y contenido listos para posicionarse.'],
  ]
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${safe} | Web profesional</title><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>body{font-family:Inter,sans-serif}</style></head><body class="bg-slate-950 text-white"><header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"><div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><div class="text-xl font-black">${templateName}</div><a class="rounded-full px-4 py-2 text-sm font-bold text-white" style="background:${accent}">Contactar</a></div></header><section class="relative px-6 py-24 text-center"><h1 class="text-5xl font-black md:text-7xl">${safe}</h1><p class="mt-6 text-lg text-white/70">Vista previa — activa la IA con un plan para personalizar y publicar.</p><div class="mt-8 flex justify-center gap-3"><a class="rounded-2xl px-6 py-4 font-bold text-white" style="background:${accent}">Crear mi web</a></div></section><section class="bg-white text-slate-900 py-20"><div class="mx-auto max-w-6xl px-6 grid gap-5 md:grid-cols-3">${cards.map(([t, x]) => `<div class="rounded-2xl border border-slate-200 p-6"><p class="text-lg font-black">${t}</p><p class="mt-3 text-slate-500">${x}</p></div>`).join('')}</div></section></body></html>`
}
async function generateWithOpenAI({ description, template = 'Web profesional', advanced = false, instruction = '', currentHtml = '' }) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    if (currentHtml) return currentHtml.replace('</body>', `<div style="position:fixed;bottom:20px;left:20px;right:20px;padding:14px;border-radius:18px;background:#111827;color:#fff;font-family:sans-serif;z-index:99999">Mejora: ${escapeHtml(instruction)}</div></body>`)
    return generateDemoHtml({ description, templateName: template, accent: '#7c3aed', isEcommerce: /tienda|shop|ecommerce/i.test(description) })
  }
  const prompt = currentHtml
    ? `HTML actual:\n${currentHtml}\n\nAplica: ${instruction}. Devuelve SOLO HTML completo, sin markdown.`
    : `Crea una web completa en HTML para: ${description}. Diseño moderno, responsive, secciones completas, textos profesionales. SOLO HTML, sin markdown. ${advanced ? 'Premium y comercial.' : 'Bonita y clara.'}`
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'Diseñador web premium. Solo HTML válido con Tailwind CDN, en español.' }, { role: 'user', content: prompt }], temperature: 0.8 }),
  })
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`)
  const data = await res.json()
  return cleanHtml(data.choices?.[0]?.message?.content || '')
}

// Webhook Stripe (antes del json parser)
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return res.status(400).json({ error: 'STRIPE_WEBHOOK_SECRET no configurado' })
  let event
  try { event = getStripe().webhooks.constructEvent(req.body, sig, secret) }
  catch (err) { return res.status(400).json({ error: err.message }) }
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object
    if (s.payment_status === 'paid' || s.status === 'complete') {
      const { plan, userId, websiteId } = s.metadata || {}
      if (plan && userId) {
        const db = readDb()
        const idx = db.users.findIndex(u => u.id === userId)
        if (idx >= 0) db.users[idx] = { ...db.users[idx], plan, updatedAt: new Date().toISOString() }
        if (websiteId) {
          const wi = db.websites.findIndex(w => w.id === websiteId)
          if (wi >= 0) db.websites[wi] = { ...db.websites[wi], plan, userId, status: plan === 'solo-web' ? db.websites[wi].status : 'published', publishedUrl: plan === 'solo-web' ? db.websites[wi].publishedUrl : `/preview/${websiteId}`, updatedAt: new Date().toISOString() }
        }
        writeDb(db)
      }
    }
  }
  res.json({ received: true })
})

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.post('/api/register', rateLimit(10, 60000), (req, res) => {
  const { name, email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })
  if (String(password).length < 6) return res.status(400).json({ error: 'Contraseña demasiado corta' })
  const db = readDb(); const norm = normalizeEmail(email)
  if (db.users.find(u => u.email === norm)) return res.status(400).json({ error: 'Email ya registrado' })
  const now = new Date().toISOString()
  const user = { id: crypto.randomUUID(), name: String(name || '').trim(), email: norm, passwordHash: hashPassword(password), hashVersion: 'pbkdf2', plan: 'free', createdAt: now, updatedAt: now }
  db.users.push(user); writeDb(db)
  res.json({ token: createToken(user), user: sanitizeUser(user) })
})
app.post('/api/login', rateLimit(20, 60000), (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })
  const db = readDb(); const idx = db.users.findIndex(u => u.email === normalizeEmail(email))
  if (idx < 0) return res.status(401).json({ error: 'Credenciales incorrectas' })
  const user = db.users[idx]; let valid = false
  if (!user.hashVersion || user.hashVersion === 'sha256') {
    if (user.passwordHash === legacySha256(password)) { valid = true; db.users[idx] = { ...user, passwordHash: hashPassword(password), hashVersion: 'pbkdf2', updatedAt: new Date().toISOString() }; writeDb(db) }
  } else { valid = user.passwordHash === hashPassword(password) }
  if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' })
  res.json({ token: createToken(db.users[idx]), user: sanitizeUser(db.users[idx]) })
})
app.get('/api/me', (req, res) => res.json({ user: sanitizeUser(getAuthUser(req)) }))
app.get('/api/websites', (req, res) => {
  const user = getAuthUser(req); if (!user) return res.status(401).json({ error: 'No autenticado' })
  const db = readDb()
  res.json({ websites: db.websites.filter(w => w.userId === user.id).map(({ html, ...r }) => r).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)) })
})
app.get('/api/websites/:id', (req, res) => {
  const db = readDb(); const w = db.websites.find(w => w.id === req.params.id)
  if (!w) return res.status(404).json({ error: 'Web no encontrada' })
  const user = getAuthUser(req)
  if (!( (user && w.userId === user.id) || w.status === 'published' || !w.userId )) return res.status(403).json({ error: 'No autorizado' })
  res.json(w)
})
app.post('/api/save-website', (req, res) => {
  const { id, description, html, template, seo } = req.body || {}
  if (!id || !description || !html) return res.status(400).json({ error: 'Faltan campos' })
  const user = getAuthUser(req); const db = readDb()
  const ei = db.websites.findIndex(w => w.id === id); const ex = ei >= 0 ? db.websites[ei] : null
  const owner = user?.id || ex?.userId || null
  if (owner && user && ex?.userId && ex.userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  const record = { id, description, html, template, seo, createdAt: ex?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString(), status: ex?.status || 'draft', plan: ex?.plan || user?.plan || 'free', userId: owner, publishedUrl: ex?.publishedUrl || null }
  if (ei >= 0) db.websites[ei] = record; else db.websites.push(record)
  writeDb(db); res.json({ success: true, website: { ...record, html: undefined } })
})
app.delete('/api/websites/:id', (req, res) => {
  const user = getAuthUser(req); if (!user) return res.status(401).json({ error: 'No autenticado' })
  const db = readDb(); const idx = db.websites.findIndex(w => w.id === req.params.id)
  if (idx < 0) return res.status(404).json({ error: 'No encontrada' })
  if (db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  db.websites.splice(idx, 1); writeDb(db); res.json({ success: true })
})
app.post('/api/publish', (req, res) => {
  const user = getAuthUser(req); if (!user) return res.status(401).json({ error: 'No autenticado' })
  if (!canPublish(user)) return res.status(403).json({ error: 'Requiere plan mensual' })
  const { id } = req.body || {}; if (!id) return res.status(400).json({ error: 'ID requerido' })
  const db = readDb(); const idx = db.websites.findIndex(w => w.id === id)
  if (idx < 0) return res.status(404).json({ error: 'No encontrada' })
  if (db.websites[idx].userId && db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  db.websites[idx] = { ...db.websites[idx], userId: user.id, plan: user.plan, status: 'published', publishedUrl: `/preview/${id}`, updatedAt: new Date().toISOString() }
  writeDb(db); res.json({ success: true, url: `/preview/${id}` })
})
app.post('/api/generate-website', rateLimit(30, 60000), async (req, res) => {
  const { description, template = 'Web profesional', advanced = false } = req.body || {}
  if (!description) return res.status(400).json({ error: 'Descripción requerida' })
  if (String(description).length > 500) return res.status(400).json({ error: 'Descripción demasiado larga' })
  try {
    const isEcommerce = /tienda|ecommerce|shop|ropa|moda/i.test(description)
    const html = advanced ? await generateWithOpenAI({ description, template, advanced: true }) : generateDemoHtml({ description, templateName: template, accent: '#7c3aed', isEcommerce })
    const id = crypto.randomUUID(); const seo = buildSeo(description, template, advanced)
    const db = readDb()
    db.websites.push({ id, description, html, template, seo, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'draft', plan: 'free', userId: null, publishedUrl: null })
    writeDb(db); res.json({ id, html, seo })
  } catch (err) { res.status(500).json({ error: err.message || 'Error generando web' }) }
})
app.post('/api/refine-website', rateLimit(20, 60000), async (req, res) => {
  const user = getAuthUser(req); if (!canRefine(user)) return res.status(403).json({ error: 'Requiere plan Pro o Business' })
  const { id, instruction } = req.body || {}; if (!id || !instruction) return res.status(400).json({ error: 'Faltan campos' })
  const db = readDb(); const idx = db.websites.findIndex(w => w.id === id)
  if (idx < 0) return res.status(404).json({ error: 'No encontrada' })
  if (db.websites[idx].userId && db.websites[idx].userId !== user.id) return res.status(403).json({ error: 'No autorizado' })
  try {
    const html = await generateWithOpenAI({ description: db.websites[idx].description, template: db.websites[idx].template || 'Web profesional', advanced: true, instruction, currentHtml: db.websites[idx].html })
    const seo = buildSeo(db.websites[idx].description, db.websites[idx].template || 'Web profesional', true)
    db.websites[idx] = { ...db.websites[idx], html, seo, updatedAt: new Date().toISOString(), plan: user.plan, userId: user.id }
    writeDb(db); res.json({ success: true, html, seo })
  } catch (err) { res.status(500).json({ error: err.message || 'Error refinando web' }) }
})
app.post('/api/create-checkout', rateLimit(10, 60000), async (req, res) => {
  const { plan, websiteId } = req.body || {}
  if (!['solo-web', 'basico', 'pro', 'business'].includes(plan)) return res.status(400).json({ error: 'Plan no válido' })
  const user = getAuthUser(req)
  if (plan !== 'solo-web' && !user) return res.status(401).json({ error: 'Inicia sesión primero' })
  try {
    const stripe = getStripe(); const baseUrl = appUrl(req)
    const priceId = process.env[{ 'solo-web': 'STRIPE_PRICE_SOLO', basico: 'STRIPE_PRICE_BASICO', pro: 'STRIPE_PRICE_PRO', business: 'STRIPE_PRICE_BUSINESS' }[plan]]
    if (!priceId) return res.status(500).json({ error: `Precio no configurado para ${plan}` })
    const fees = { basico: 3000, pro: 3000, business: 3000 }
    const session = plan === 'solo-web'
      ? await stripe.checkout.sessions.create({ mode: 'payment', line_items: [{ price: priceId, quantity: 1 }], success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=solo-web`, cancel_url: `${baseUrl}/checkout/cancel`, customer_email: user?.email, metadata: { plan, websiteId: websiteId || '', userId: user?.id || '' } })
      : await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [{ price_data: { currency: 'eur', product_data: { name: 'Cuota de alta' }, unit_amount: fees[plan] }, quantity: 1 }, { price: priceId, quantity: 1 }], success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`, cancel_url: `${baseUrl}/checkout/cancel`, customer_email: user?.email, metadata: { plan, websiteId: websiteId || '', userId: user?.id || '' } })
    res.json({ url: session.url, sessionId: session.id })
  } catch (err) { res.status(500).json({ error: err.message }) }
})
app.post('/api/verify-checkout', rateLimit(20, 60000), async (req, res) => {
  const { sessionId } = req.body || {}; if (!sessionId) return res.status(400).json({ error: 'sessionId requerido' })
  try {
    const stripe = getStripe(); const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (!(session.payment_status === 'paid' || session.status === 'complete')) return res.status(409).json({ error: 'Pago no completado' })
    const plan = session.metadata?.plan || 'basico'; const { websiteId, userId } = session.metadata || {}
    const db = readDb(); let user = null
    if (userId) { const idx = db.users.findIndex(u => u.id === userId); if (idx >= 0) { db.users[idx] = { ...db.users[idx], plan, updatedAt: new Date().toISOString() }; user = db.users[idx] } }
    if (websiteId) { const wi = db.websites.findIndex(w => w.id === websiteId); if (wi >= 0) db.websites[wi] = { ...db.websites[wi], plan, userId: userId || db.websites[wi].userId || null, status: plan === 'solo-web' ? db.websites[wi].status : 'published', updatedAt: new Date().toISOString(), publishedUrl: plan === 'solo-web' ? db.websites[wi].publishedUrl : `/preview/${websiteId}` } }
    writeDb(db); res.json({ success: true, user: sanitizeUser(user) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Importar y usar el servidor SSR de TanStack
let ssrHandler = null
try {
  const ssrModule = await import('./dist/server/server.js')
  const ssrServer = ssrModule.default
  ssrHandler = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    })
    try {
      const response = await ssrServer.fetch(request)
      res.status(response.status)
      response.headers.forEach((value, key) => res.setHeader(key, value))
      const text = await response.text()
      res.send(text)
    } catch (e) {
      // Si SSR falla, servir el index.html estático
      res.sendFile(path.join(DIST_CLIENT, 'index.html'))
    }
  }
} catch (e) {
  console.log('SSR no disponible, usando modo estático')
}

// Archivos estáticos
app.use(express.static(DIST_CLIENT, { index: false }))

// Rutas del frontend
app.get('*', async (req, res) => {
  if (ssrHandler) {
    await ssrHandler(req, res)
  } else {
    res.sendFile(path.join(DIST_CLIENT, 'index.html'))
  }
})

app.listen(PORT, () => {
  console.log(`ClickWeb corriendo en http://localhost:${PORT}`)
  if (!process.env.STRIPE_WEBHOOK_SECRET) console.warn('AVISO: STRIPE_WEBHOOK_SECRET no definido')
})
