# ClickWeb

## Qué lleva esta versión
- Home premium con reseñas, plantillas, precios y WhatsApp.
- Login y registro.
- Creador con demo gratis, candados premium, panel SEO y editor simple.
- Dashboard con webs guardadas.
- Stripe con 4 planes:
  - Solo la Web 49,99€
  - Básico 39€ y luego 9€/mes
  - Pro 55€ y luego 25€/mes
  - Business 90€ y luego 60€/mes
- Verificación del checkout para activar el plan en la cuenta.

## Para ponerla online
1. Sube este proyecto a Netlify.
2. Añade las variables del archivo `.env.example`.
3. Netlify instalará dependencias y hará el build automáticamente.

## Importante
- La demo gratis no usa IA cara.
- La edición con IA premium usa `ANTHROPIC_API_KEY`. Si no la pones, hay fallback visual simple.
- Si quieres usar OpenAI en vez de Anthropic, hay que cambiar la función `refine-website.mts` y la función de generación premium.
