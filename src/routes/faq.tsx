import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

const faqs = [
  {
    category: 'Sobre el producto',
    items: [
      {
        question: '¿Qué es Web en 1 frase?',
        answer:
          'Web en 1 frase es una plataforma que utiliza inteligencia artificial para generar webs profesionales completas a partir de una descripción en lenguaje natural. Describes tu negocio en una frase, y la IA crea el diseño, los textos persuasivos, selecciona imágenes y configura el SEO por ti — todo en segundos.',
      },
      {
        question: '¿Necesito saber de programación o diseño?',
        answer:
          'No, en absoluto. La plataforma está diseñada para autónomos y empresarios sin conocimientos técnicos. Si puedes escribir un mensaje de WhatsApp, puedes crear tu web profesional con nosotros.',
      },
      {
        question: '¿Cuánto tiempo tarda en generarse mi web?',
        answer:
          'La generación inicial tarda entre 30 y 60 segundos. Después puedes revisar el resultado, hacer ajustes con lenguaje natural y publicar. La mayoría de nuestros usuarios tienen su web en línea en menos de 10 minutos desde que empiezan.',
      },
      {
        question: '¿Puedo editar la web después de generarla?',
        answer:
          'Sí, puedes modificar cualquier elemento de tu web en cualquier momento usando lenguaje natural. Ejemplos: "cambia el color principal a verde", "añade un apartado de testimonios de clientes", "pon mi número de teléfono más visible", "crea una sección de precios". La IA entiende instrucciones en español cotidiano.',
      },
    ],
  },
  {
    category: 'Precios y facturación',
    items: [
      {
        question: '¿Puedo comprar solo la web sin suscripción?',
        answer:
          'Sí. Si solo quieres tu página web y nada más, puedes comprarla por 49,99€ como pago único. Descargas el código HTML completo y es tuya para siempre, sin cuotas mensuales ni compromisos.',
      },
      {
        question: '¿Cómo funciona el primer pago de los planes?',
        answer:
          'La primera vez que contratas un plan, pagas 30€ de cuota de alta (que incluye la creación de tu web) más el precio del plan que elijas. A partir del segundo mes, solo pagas el plan mensual, sin los 30€.',
      },
      {
        question: '¿Necesito tarjeta de crédito para empezar?',
        answer:
          'No. Puedes crear y previsualizar tu web completamente gratis sin introducir ningún dato de pago. Solo necesitarás una forma de pago si decides descargarla o contratar un plan.',
      },
      {
        question: '¿Puedo cancelar mi suscripción en cualquier momento?',
        answer:
          'Sí. No hay permanencia ni penalizaciones. Puedes cancelar desde tu panel de control con un clic. Seguirás teniendo acceso a tu plan hasta el final del período facturado.',
      },
      {
        question: '¿Los precios incluyen IVA?',
        answer:
          'Sí, todos los precios que ves incluyen el IVA aplicable. No hay costes ocultos ni sorpresas en la factura. Emitimos facturas con todos los datos fiscales para que puedas deducirlo como gasto de empresa.',
      },
    ],
  },
  {
    category: 'Dominio y alojamiento',
    items: [
      {
        question: '¿El dominio .es está incluido?',
        answer:
          'Sí, en los planes con seguimiento (Básico, Pro, Business) incluimos un dominio .es o .com de tu elección durante el primer año, sin coste adicional. Si compras solo la web por 49,99€, puedes subir el HTML a tu propio hosting con tu dominio.',
      },
      {
        question: '¿Puedo usar un dominio que ya tengo?',
        answer:
          'Sí. Si ya tienes un dominio registrado en otro proveedor, puedes conectarlo a tu web fácilmente desde el panel de control. Te guiamos paso a paso en el proceso de configuración DNS.',
      },
      {
        question: '¿Dónde está alojada mi web?',
        answer:
          'Tus webs se alojan en servidores de alto rendimiento con centros de datos en Europa (Frankfurt y Madrid). Esto garantiza velocidad de carga óptima para visitantes españoles y cumplimiento del RGPD.',
      },
    ],
  },
  {
    category: 'SEO y visibilidad',
    items: [
      {
        question: '¿Cómo funciona el SEO local?',
        answer:
          'Nuestra IA optimiza automáticamente tu web para búsquedas locales: incluye tu ciudad y provincia en los metadatos, genera contenido con palabras clave geográficas, crea el marcado estructurado (Schema.org) para negocios locales y te ayuda a optimizar tu ficha de Google Business. El plan Pro y Business incluyen SEO avanzado con seguimiento de posiciones.',
      },
      {
        question: '¿Aparecerá mi web en Google Maps?',
        answer:
          'La web en sí no aparece directamente en Google Maps, pero el plan Business incluye integración y optimización de tu ficha de Google Business, que sí aparece en Maps. Además, el SEO local de tu web ayuda a que tu ficha de Maps gane más relevancia.',
      },
    ],
  },
  {
    category: 'Tienda online y WhatsApp',
    items: [
      {
        question: '¿Puedo vender productos en mi web?',
        answer:
          'Sí. El plan Business incluye tienda online completa con catálogo de productos, carrito de compra, pasarela de pago segura (Stripe, PayPal y Bizum) y gestión de pedidos. También puedes activar la funcionalidad de "pedir por WhatsApp" para que los clientes hagan pedidos directamente por mensajería.',
      },
      {
        question: '¿Cómo funciona el botón de WhatsApp?',
        answer:
          'El botón de WhatsApp flotante está disponible en todos los planes. Al hacer clic, abre una conversación de WhatsApp con tu número de empresa con un mensaje predefinido. Es la herramienta de captación con mayor tasa de conversión para negocios locales españoles.',
      },
    ],
  },
]

function FAQ() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-violet-600 font-medium hover:underline mb-10"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-center mb-4 text-gray-900">
          Preguntas frecuentes
        </h1>
        <p className="text-center text-gray-500 mb-16 text-lg max-w-xl mx-auto">
          Todo lo que necesitas saber sobre Web en 1 frase. ¿No encuentras tu
          respuesta?{' '}
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline"
          >
            Escríbenos por WhatsApp
          </a>
          .
        </p>
        <div className="space-y-10">
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-4">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((faq, i) => (
                  <Accordion
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mt-16 text-center bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-black mb-3">¿Listo para empezar?</h2>
          <p className="text-white/80 mb-6">
            Desde 49,99€ pago único o con planes de seguimiento desde 9€/mes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-black px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Crear mi web gratis
          </Link>
        </div>
      </div>
    </div>
  )
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  )
}
