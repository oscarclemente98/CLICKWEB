import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Download, Globe, Loader2 } from 'lucide-react'
import { api, getStoredToken, setStoredAuth } from '../lib-auth.ts'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccessPage,
  validateSearch: (search: Record<string, unknown>) => ({
    plan: (search.plan as string) || '',
    session_id: (search.session_id as string) || '',
  }),
})

function CheckoutSuccessPage() {
  const { plan, session_id } = Route.useSearch()
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      if (!session_id) {
        setStatus('done')
        return
      }
      try {
        const data = await api<{ user?: any }>('/api/verify-checkout', {
          method: 'POST',
          body: JSON.stringify({ sessionId: session_id }),
        })
        if (data.user) setStoredAuth(getStoredToken(), data.user)
        setStatus('done')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo validar el pago')
        setStatus('error')
      }
    }
    run()
  }, [session_id])

  const planNames: Record<string, string> = {
    'solo-web': 'Solo la Web',
    basico: 'Básico',
    pro: 'Pro',
    business: 'Business',
  }

  const isSolo = plan === 'solo-web'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft text-center">
        {status === 'loading' ? (
          <>
            <Loader2 size={44} className="mx-auto animate-spin text-violet-600" />
            <h1 className="mt-6 text-3xl font-black">Validando tu pago</h1>
            <p className="mt-3 text-slate-500">Estamos activando tu plan y preparando tu panel.</p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"><CheckCircle2 size={42} className="text-emerald-600" /></div>
            <h1 className="text-3xl font-black">{isSolo ? '¡Pago completado!' : '¡Pago completado!'}</h1>
            <p className="mt-3 text-lg text-slate-500">{isSolo ? 'Tu web está lista para descargar.' : <>Tu plan <strong className="text-violet-600">{planNames[plan] || plan}</strong> ya está activo.</>}</p>
            {status === 'error' && <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">{error}</p>}
            <div className={`mt-8 rounded-[1.6rem] p-6 text-left ${isSolo ? 'bg-emerald-50' : 'bg-violet-50'}`}>
              <p className="mb-3 flex items-center gap-2 font-black text-slate-900">{isSolo ? <Download size={18} /> : <Globe size={18} />} Próximos pasos</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {isSolo ? (
                  <>
                    <li>• Ve a tu panel y descarga el HTML completo.</li>
                    <li>• Súbelo a tu hosting favorito o entréganoslo para publicarlo.</li>
                    <li>• Si luego quieres panel, SEO y publicación, puedes pasarte a un plan mensual.</li>
                  </>
                ) : (
                  <>
                    <li>• Tu web ya puede guardarse, editarse y publicarse desde tu panel.</li>
                    <li>• Ahora puedes usar las funciones desbloqueadas de tu plan.</li>
                    <li>• Vuelve cuando quieras para tocar la web y republicarla.</li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white">Mi panel <ArrowRight size={18} /></Link>
              <Link to="/crear" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 font-bold text-slate-700">Crear otra web</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
