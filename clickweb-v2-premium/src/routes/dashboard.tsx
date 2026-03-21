import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, Eye, Globe, Loader2, Pencil, Plus, Search, Trash2, Wand2 } from 'lucide-react'
import { api, clearStoredAuth, getStoredUser } from '../lib-auth.ts'

interface Website {
  id: string
  description: string
  createdAt: string
  updatedAt?: string
  status: 'draft' | 'published'
  plan: string
  seo?: { score?: number }
}

export const Route = createFileRoute('/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const navigate = useNavigate()
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState('')
  const user = getStoredUser()

  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' })
      return
    }
    ;(async () => {
      try {
        const data = await api<{ websites: Website[] }>('/api/websites')
        setWebsites(data.websites || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar tus webs')
      } finally {
        setLoading(false)
      }
    })()
  }, [navigate, user])

  const deleteWebsite = async (id: string) => {
    if (!confirm('¿Eliminar esta web?')) return
    setDeleting(id)
    try {
      await api(`/api/websites/${id}`, { method: 'DELETE' })
      setWebsites((prev) => prev.filter((w) => w.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar')
    } finally {
      setDeleting('')
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"><ArrowLeft size={18} /> Inicio</Link>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">ClickWeb</p>
              <h1 className="text-lg font-black">Tu panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { clearStoredAuth(); navigate({ to: '/' }) }} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Salir</button>
            <Link to="/crear" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-soft"><Plus size={18} /> Nueva web</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Hola{user.name ? `, ${user.name}` : ''}</p>
            <h2 className="mt-2 text-4xl font-black">Tus webs viven aquí</h2>
            <p className="mt-4 max-w-2xl text-slate-500">Este es el valor de tus planes mensuales: tus webs quedan guardadas, vuelves cuando quieras, las modificas y las vuelves a publicar.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-4 py-2">Plan actual: <strong className="capitalize">{user.plan}</strong></span>
              <span className="rounded-full bg-slate-100 px-4 py-2">{websites.length} webs guardadas</span>
              <span className="rounded-full bg-slate-100 px-4 py-2">Edición, SEO y publicación</span>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-violet-900 to-indigo-900 p-7 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Resumen rápido</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black">{websites.length}</p><p className="text-sm text-white/70">Proyectos</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black">{websites.filter((w) => w.status === 'published').length}</p><p className="text-sm text-white/70">Publicadas</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black capitalize">{user.plan}</p><p className="text-sm text-white/70">Plan</p></div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="py-20 text-center"><Loader2 size={40} className="mx-auto animate-spin text-violet-600" /><p className="mt-4 text-slate-500">Cargando tus webs...</p></div>
        ) : error ? (
          <div className="mt-8 rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        ) : websites.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-soft">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100"><Globe size={36} className="text-violet-600" /></div>
            <h3 className="mt-5 text-3xl font-black">Aún no tienes ninguna web</h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">Empieza con una demo gratis, desbloquea el plan que quieras y gestiona todo desde aquí.</p>
            <Link to="/crear" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-soft"><Wand2 size={18} /> Crear mi primera web</Link>
          </div>
        ) : (
          <section className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">Tus proyectos</p>
                <h3 className="mt-2 text-3xl font-black">Webs guardadas y listas para tocar</h3>
              </div>
              <Link to="/crear" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft">Nueva web</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {websites.map((website) => (
                <div key={website.id} className="card-hover overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-100 to-slate-100">
                    <div className="rounded-3xl bg-white p-5 shadow-sm"><Globe size={42} className="text-violet-500" /></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${website.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{website.status === 'published' ? 'Publicada' : 'Borrador'}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">SEO {website.seo?.score || 76}</span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-lg font-black text-slate-900">{website.description}</p>
                    <p className="mt-2 text-sm text-slate-500">Actualizada {new Date(website.updatedAt || website.createdAt).toLocaleDateString('es-ES')}</p>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <Link to="/preview/$id" params={{ id: website.id }} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"><Eye size={16} /> Ver</Link>
                      <Link to="/crear" search={{ desc: website.description, id: website.id }} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"><Pencil size={16} /> Editar</Link>
                      <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"><Search size={16} /> SEO</button>
                      <button onClick={() => deleteWebsite(website.id)} disabled={deleting === website.id} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600">{deleting === website.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />} Borrar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
