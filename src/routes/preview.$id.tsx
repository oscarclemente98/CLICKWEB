import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Download, Loader2, ExternalLink, RefreshCw, Lock, X, Check, Star } from 'lucide-react'
import { api } from '../lib-auth.ts'

export const Route = createFileRoute('/preview/$id')({
  component: PreviewPage,
})

function PreviewPage() {
  const { id } = Route.useParams()
  const [html, setHtml] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [plan, setPlan] = useState<string>('free')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showToolbar, setShowToolbar] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    const loadWebsite = async () => {
      // First try sessionStorage for instant preview (set by crear page)
      const cached = sessionStorage.getItem(`preview-${id}`)
      if (cached) {
        try {
          const data = JSON.parse(cached)
          setHtml(data.html)
          setDescription(data.description || '')
          setPlan(data.plan || 'free')
          setIsLoading(false)
          sessionStorage.removeItem(`preview-${id}`)
          return
        } catch {
          // Fall through to API
        }
      }

      // Fall back to API
      try {
        const data = await api<any>(`/api/websites/${id}`)
        setHtml(data.html)
        setDescription(data.description)
        setPlan(data.plan || 'free')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    loadWebsite()
  }, [id])

  const downloadHtml = () => {
    if (!html) return
    if (plan === 'free') {
      setShowPaywall(true)
      return
    }
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mi-web.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCheckout = useCallback(
    async (selectedPlan: string) => {
      try {
        const data = await api<any>('/api/create-checkout', { method: 'POST', body: JSON.stringify({ plan: selectedPlan, websiteId: id }) })

        if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error(data.error || 'Error al crear sesión de pago')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error con el pago')
      }
    },
    [id]
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-500">Cargando vista previa...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md">
          <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:underline"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating toolbar */}
      {showToolbar && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 px-5 py-3 flex items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Mis webs
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <p className="text-sm text-gray-500 max-w-[200px] truncate">{description}</p>
          <div className="h-5 w-px bg-gray-200" />
          <Link
            to="/crear"
            search={{ desc: description, id }}
            className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-sm font-semibold transition-colors"
          >
            <RefreshCw size={14} />
            Editar
          </Link>
          <button
            onClick={downloadHtml}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            {plan === 'free' ? <Lock size={14} /> : <Download size={14} />}
            {plan === 'free' ? 'Descargar (PRO)' : 'Descargar'}
          </button>
          <button
            onClick={() => setShowToolbar(false)}
            className="text-gray-400 hover:text-gray-600 text-xs ml-1"
            title="Ocultar barra"
          >
            ×
          </button>
        </div>
      )}

      {!showToolbar && (
        <button
          onClick={() => setShowToolbar(true)}
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Mostrar barra de herramientas"
        >
          <ExternalLink size={16} className="text-gray-600" />
        </button>
      )}

      {/* Full-page iframe preview */}
      <iframe
        srcDoc={html || ''}
        className="w-full min-h-screen border-0"
        title="Vista previa de tu web"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPaywall(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <Download size={32} className="text-violet-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Descarga tu web profesional
              </h3>
              <p className="text-gray-500">
                Tu web está lista. Elige cómo quieres obtenerla.
              </p>
            </div>

            {/* Solo la Web option */}
            <div className="mb-4">
              <button
                onClick={() => {
                  setShowPaywall(false)
                  handleCheckout('solo-web')
                }}
                className="w-full text-left p-4 rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg shadow-emerald-100 transition-all hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      Solo la Web
                      <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                        Pago único
                      </span>
                    </p>
                  </div>
                  <p className="font-black text-xl text-emerald-600">
                    49,99€
                    <span className="text-sm font-normal text-gray-400"> una vez</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {['Web profesional completa', 'Código HTML descargable', 'Sin suscripción'].map((f) => (
                    <span key={f} className="text-xs text-gray-500 flex items-center gap-1">
                      <Check size={12} className="text-emerald-500" />
                      {f}
                    </span>
                  ))}
                </div>
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">O elige un plan con seguimiento</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  key: 'basico',
                  name: 'Básico',
                  price: '9€',
                  period: '/mes',
                  firstMonth: '39€',
                  features: ['1 web + dominio .es', 'Código HTML completo', 'Soporte por email'],
                },
                {
                  key: 'pro',
                  name: 'Pro',
                  price: '25€',
                  period: '/mes',
                  firstMonth: '55€',
                  popular: true,
                  features: [
                    '3 webs + SEO avanzado',
                    'Código HTML completo',
                    'Dominio personalizado',
                    'Soporte prioritario',
                  ],
                },
                {
                  key: 'business',
                  name: 'Business',
                  price: '60€',
                  period: '/mes',
                  firstMonth: '90€',
                  features: [
                    'Webs ilimitadas',
                    'Tienda online incluida',
                    'SEO + Analytics',
                    'Soporte dedicado 24/7',
                  ],
                },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    setShowPaywall(false)
                    handleCheckout(p.key)
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all hover:scale-[1.01] ${
                    p.popular
                      ? 'border-violet-400 bg-gradient-to-r from-violet-50 to-indigo-50 shadow-lg shadow-violet-100'
                      : 'border-gray-200 hover:border-violet-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-bold text-gray-900 flex items-center gap-2">
                        {p.name}
                        {p.popular && (
                          <span className="text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Star size={10} fill="white" />
                            Popular
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="font-black text-xl text-violet-600">
                      {p.price}
                      <span className="text-sm font-normal text-gray-400">{p.period}</span>
                    </p>
                  </div>
                  <p className="text-xs text-violet-500 mb-2">
                    1er mes: {p.firstMonth} (30€ web + {p.price}{p.period}) · después solo {p.price}{p.period}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {p.features.map((f) => (
                      <span key={f} className="text-xs text-gray-500 flex items-center gap-1">
                        <Check size={12} className="text-green-500" />
                        {f}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400">
              Puedes ver y editar tu web gratis. El pago es solo para descargar el código.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
