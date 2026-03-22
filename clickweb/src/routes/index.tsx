import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lock,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Wand2,
} from 'lucide-react'
import { getStoredUser } from '../lib-auth.ts'
import { templates } from '../lib-site.ts'

export const Route = createFileRoute('/')({ component: HomePage })

const reviews = [
  {
    name: 'Marta Ruiz',
    role: 'Centro de estética',
    quote: 'En una tarde tenía la web lista y al día siguiente ya me entraban mensajes por WhatsApp.',
  },
  {
    name: 'Carlos Vega',
    role: 'Tienda de calcetines',
    quote: 'La demo me convenció al instante y Business me dejó una tienda preciosa y fácil de conectar después con Shopify.',
  },
  {
    name: 'Laura Martín',
    role: 'Freelance creativa',
    quote: 'Lo mejor es poder volver al panel y modificar la web cuando quiero sin depender de nadie.',
  },
  {
    name: 'Javier Gómez',
    role: 'Abogado',
    quote: 'El panel SEO y la estructura me ayudaron a tener una web seria sin perder semanas.',
  },
]

const plans = [
  {
    name: 'Solo la Web',
    price: '49,99€',
    note: 'Pago único',
    desc: 'Tu web lista en minutos, sin suscripción.',
    bullets: ['Descarga HTML', 'Responsive', 'SEO base'],
  },
  {
    name: 'Básico',
    price: '39€',
    note: 'Luego 9€/mes',
    desc: 'Empieza tu web y mantenla online fácilmente.',
    bullets: ['1 web guardada', 'Panel privado', 'SEO básico'],
  },
  {
    name: 'Pro',
    price: '55€',
    note: 'Luego 25€/mes',
    desc: 'Para negocios que quieren crecer online.',
    bullets: ['Hasta 3 webs', 'Edición con IA', 'SEO premium'],
    featured: true,
  },
  {
    name: 'Business',
    price: '90€',
    note: 'Luego 60€/mes',
    desc: 'Tienda online preparada para vender en serio.',
    bullets: ['Webs ilimitadas', 'Modo ecommerce', 'Preparada para Shopify'],
  },
]

function HomePage() {
  const navigate = useNavigate()
  const [idea, setIdea] = useState('Quiero una tienda de calcetines premium con estilo moderno y lista para vender')
  const user = useMemo(() => getStoredUser(), [])
  const featuredTemplates = templates.slice(0, 8)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-black tracking-tight gradient-text">
            ClickWeb
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#como-funciona" className="hover:text-violet-600">Cómo funciona</a>
            <a href="#plantillas" className="hover:text-violet-600">Plantillas</a>
            <a href="#opiniones" className="hover:text-violet-600">Reseñas</a>
            <a href="#precios" className="hover:text-violet-600">Precios</a>
            <Link to={user ? '/dashboard' : '/login'} className="hover:text-violet-600">{user ? 'Mi panel' : 'Iniciar sesión'}</Link>
          </nav>
          <Link
            to="/crear"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-brand"
          >
            Crear mi web
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute inset-0 grid-dots opacity-50" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                <Sparkles size={16} />
                Demo gratis · IA real solo cuando pagan
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-900 md:text-7xl md:leading-[1.05]">
                Crea una web profesional lista para conseguir clientes en minutos
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Diseñada con IA, optimizada para SEO y preparada para vender desde el primer día. Sin programar, sin complicaciones y con panel para volver cuando quieras.
              </p>
              <div className="mt-8 max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-3 shadow-soft">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none focus:border-violet-300"
                    placeholder="Describe tu web en una frase"
                  />
                  <button
                    onClick={() => navigate({ to: '/crear', search: { desc: idea } })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-brand"
                  >
                    Crear mi web ahora
                    <Wand2 size={18} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  {['Tienda online', 'Negocio local', 'Portfolio', 'SEO listo', 'Shopify-ready'].map((item) => (
                    <span key={item} className="rounded-full bg-slate-50 px-3 py-1.5">{item}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Demo sin tarjeta</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> IA premium solo al pagar</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Panel para editar y publicar</div>
              </div>
            </div>

            <div className="fade-up">
              <div className="rounded-[2.2rem] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="rounded-[1.9rem] bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Vista premium</p>
                      <h2 className="mt-2 text-3xl font-black">Tu web en 1 pantalla</h2>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">ClickWeb</div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      ['Diseño profesional', 'Hero potente, bloques claros y secciones que convierten.'],
                      ['SEO visible', 'Meta title, descripción, FAQ y recomendaciones.'],
                      ['Panel mensual', 'Tus webs guardadas para volver y modificarlas.'],
                      ['Modo ecommerce', 'Business listo para catálogo y Shopify después.'],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                        <p className="font-black">{title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-[1.5rem] bg-white px-5 py-4 text-slate-900">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-500">Plan que más se vende</p>
                        <p className="text-xl font-black">Pro · 55€ el primer pago</p>
                      </div>
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">Después 25€/mes</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.6rem] bg-slate-50 p-4 text-center"><p className="text-3xl font-black">+1.000</p><p className="text-sm text-slate-500">demos creadas</p></div>
                  <div className="rounded-[1.6rem] bg-slate-50 p-4 text-center"><p className="text-3xl font-black">24</p><p className="text-sm text-slate-500">plantillas sectoriales</p></div>
                  <div className="rounded-[1.6rem] bg-slate-50 p-4 text-center"><p className="text-3xl font-black">5★</p><p className="text-sm text-slate-500">experiencia simple</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-4 stagger">
            {[
              {
                icon: <Sparkles size={20} className="text-violet-600" />,
                title: 'Diseño profesional',
                text: 'Web moderna, rápida y adaptada a móvil desde el primer momento.',
              },
              {
                icon: <Search size={20} className="text-violet-600" />,
                title: 'SEO automático',
                text: 'Tu web sale optimizada para aparecer en Google sin esfuerzo.',
              },
              {
                icon: <Store size={20} className="text-violet-600" />,
                title: 'Lista para vender',
                text: 'Perfecta para servicios, captación o tiendas online.',
              },
              {
                icon: <ShieldCheck size={20} className="text-violet-600" />,
                title: 'Súper fácil',
                text: 'Crea, edita y publica sin conocimientos técnicos.',
              },
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">{item.icon}</div>
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="opiniones" className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Prueba social</p>
                <h2 className="mt-2 text-4xl font-black">Reseñas que dan confianza de verdad</h2>
              </div>
              <p className="max-w-2xl text-slate-500">La gente no compra una herramienta. Compra la sensación de que por fin puede lanzar una web buena sin perder tiempo ni depender de nadie.</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4 stagger">
              {reviews.map((review) => (
                <div key={review.name} className="card-hover rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                  <p className="mt-4 text-[15px] leading-7 text-slate-600">“{review.quote}”</p>
                  <div className="mt-5">
                    <p className="font-black text-slate-900">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Cómo funciona</p>
            <h2 className="mt-2 text-4xl font-black">Tu web en 3 pasos</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">El objetivo es que cualquiera entienda el proceso en segundos: pruebas, ves valor y solo pagas cuando merece la pena.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3 stagger">
            {[
              ['1', 'Elige plantilla', 'Tienda, negocio local, portfolio o la categoría que mejor encaje contigo.'],
              ['2', 'Describe tu idea', 'Ejemplo: “tienda de calcetines premium con catálogo visual y WhatsApp”.'],
              ['3', 'Activa tu plan', 'Desbloquea edición, SEO y publicación cuando la demo ya te ha convencido.'],
            ].map(([num, title, text]) => (
              <div key={title} className="card-hover rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-black text-white">{num}</div>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="plantillas" className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Plantillas</p>
                <h2 className="mt-2 text-4xl font-black">Muchísimas plantillas para empezar ya bien</h2>
              </div>
              <Link to="/crear" className="inline-flex items-center gap-2 text-sm font-bold text-violet-700">
                Ver todas
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger">
              {featuredTemplates.map((template) => (
                <div key={template.key} className="card-hover rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="text-3xl">{template.emoji}</div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{template.category}</p>
                  <h3 className="mt-2 text-xl font-black">{template.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{template.tagline}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700">Usar plantilla <ChevronRight size={16} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="precios" className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Precios</p>
            <h2 className="mt-2 text-4xl font-black">Elige cómo quieres trabajar tu web</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">Pago único si solo quieres descargarla. Suscripción si quieres guardarla, editarla, mejorar SEO y volver cuando te haga falta.</p>
          </div>
          <div className="mt-10 grid gap-5 xl:grid-cols-4 stagger">
            {plans.map((plan) => (
              <div key={plan.name} className={`card-hover rounded-[2rem] border p-6 shadow-soft ${plan.featured ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-black">{plan.name}</p>
                    <p className="mt-2 text-sm text-slate-500">{plan.desc}</p>
                  </div>
                  {plan.featured && <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">Más elegido</span>}
                </div>
                <div className="mt-6">
                  <p className="text-5xl font-black tracking-tight">{plan.price}</p>
                  <p className="mt-2 text-sm text-slate-500">{plan.note}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {bullet}</li>
                  ))}
                </ul>
                <Link to="/crear" className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-bold ${plan.featured ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-brand' : 'border border-slate-200 text-slate-800'}`}>
                  {plan.name === 'Solo la Web' ? 'Quiero mi web' : `Elegir ${plan.name}`}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Modo Business</p>
              <h2 className="mt-2 text-4xl font-black">Tu tienda online, lista para vender</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Si tu cliente pide una web de calcetines, moda o joyería, ClickWeb genera una estructura ecommerce real: home, catálogo, fichas, reseñas, beneficios, CTA y diseño preparado para conectar Shopify después.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Catálogo visual', 'Fichas de producto', 'Bloques de confianza', 'Estructura Shopify-ready'].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="rounded-[1.8rem] bg-gradient-to-br from-slate-950 via-violet-900 to-indigo-900 p-6 text-white">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-white/10 p-4"><p className="text-sm text-white/60">Hero ecommerce</p><p className="mt-2 text-xl font-black">Marca de calcetines premium</p><p className="mt-2 text-sm text-white/70">Diseño atractivo, CTA fuertes y beneficios claros.</p></div>
                  <div className="rounded-[1.5rem] bg-white/10 p-4"><p className="text-sm text-white/60">Productos</p><p className="mt-2 text-xl font-black">Colección destacada</p><p className="mt-2 text-sm text-white/70">Cards listas para conectar producto o botón Shopify.</p></div>
                  <div className="rounded-[1.5rem] bg-white/10 p-4"><p className="text-sm text-white/60">Conversión</p><p className="mt-2 text-xl font-black">Reseñas y garantías</p><p className="mt-2 text-sm text-white/70">Más confianza para vender desde el primer día.</p></div>
                  <div className="rounded-[1.5rem] bg-white/10 p-4"><p className="text-sm text-white/60">Escalado</p><p className="mt-2 text-xl font-black">SEO + blog + categorías</p><p className="mt-2 text-sm text-white/70">Preparada para crecer y posicionarse mejor.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="rounded-[2.2rem] bg-slate-950 px-8 py-12 text-white shadow-soft">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Empieza hoy</p>
                <h2 className="mt-2 text-4xl font-black">Tu web profesional puede estar lista hoy</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">Crea una demo, mira el resultado y desbloquea la versión completa cuando de verdad te convenza.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link to="/crear" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-slate-900">Crear mi web <ArrowRight size={18} /></Link>
                <a href="https://wa.me/34665196043?text=Hola%20%F0%9F%91%8B%20estoy%20viendo%20ClickWeb%20y%20quiero%20crear%20mi%20web%2C%20%C2%BFme%20puedes%20ayudar%3F" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/34665196043?text=Hola%20%F0%9F%91%8B%20estoy%20viendo%20ClickWeb%20y%20quiero%20crear%20mi%20web%2C%20%C2%BFme%20puedes%20ayudar%3F"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-2xl transition-transform hover:scale-[1.02]"
      >
        <MessageCircle size={18} /> ¿Dudas? WhatsApp
      </a>
    </div>
  )
}
