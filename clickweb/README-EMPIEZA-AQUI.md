# ClickWeb — Guía de puesta en marcha

## Qué incluye esta versión

- Home en español con reseñas, plantillas (24), FAQ, precios y WhatsApp
- Registro e inicio de sesión con JWT (30 días de validez)
- Demo gratis sin consumir IA premium
- Guardado de webs, publicación y vista previa pública
- Editor con IA para planes Pro y Business
- Stripe con 4 planes:
  - Solo la Web → 49,99€ pago único
  - Básico → 39€ de alta + 9€/mes
  - Pro → 55€ de alta + 25€/mes
  - Business → 90€ de alta + 60€/mes
- Webhook de Stripe para activar planes de forma segura
- Rate limiting en todos los endpoints de generación y auth
- Contraseñas con PBKDF2 (migración automática desde SHA-256 si venías de v1)
- Backend integrado en `server.js`, listo para Render

## Variables de entorno en Render

Configúralas en Settings → Environment Variables:

| Variable | Descripción |
|---|---|
| `JWT_SECRET` | Clave secreta para firmar tokens (mín. 32 chars) |
| `OPENAI_API_KEY` | Clave de OpenAI para la IA premium |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret del webhook de Stripe |
| `APP_URL` | URL de tu app, ej: https://clickweb.onrender.com |
| `STRIPE_PRICE_SOLO` | ID del precio de Stripe para Solo la Web |
| `STRIPE_PRICE_BASICO` | ID del precio de Stripe para Básico |
| `STRIPE_PRICE_PRO` | ID del precio de Stripe para Pro |
| `STRIPE_PRICE_BUSINESS` | ID del precio de Stripe para Business |

## Configurar el webhook de Stripe

1. Ve a Dashboard de Stripe → Developers → Webhooks
2. Haz clic en "Add endpoint"
3. URL: `https://tu-app.onrender.com/api/webhook`
4. Selecciona los eventos: `checkout.session.completed` y `customer.subscription.deleted`
5. Copia el "Signing secret" y ponlo en `STRIPE_WEBHOOK_SECRET`

## Despliegue en Render

- Root Directory: vacío (dejar en blanco)
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- El `render.yaml` ya incluye un disco persistente de 1GB en `/data`
  → **Los datos de usuarios y webs no se pierden entre deploys**

## Importante sobre la base de datos

Los datos se guardan en `data/db.json`. El `render.yaml` monta un disco
persistente en Render para que no se pierdan al redeploy. Si algún día
creces mucho, el siguiente paso sería migrar a Supabase o PlanetScale.

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/register` | Registrar usuario |
| POST | `/api/login` | Iniciar sesión |
| GET | `/api/me` | Usuario actual |
| GET | `/api/websites` | Mis webs (auth) |
| GET | `/api/websites/:id` | Ver web por ID |
| POST | `/api/save-website` | Guardar web |
| DELETE | `/api/websites/:id` | Eliminar web |
| POST | `/api/publish` | Publicar web |
| POST | `/api/generate-website` | Generar web (demo o IA) |
| POST | `/api/refine-website` | Mejorar web con IA (Pro/Business) |
| POST | `/api/create-checkout` | Crear sesión de pago Stripe |
| POST | `/api/verify-checkout` | Verificar pago completado |
| POST | `/api/webhook` | Webhook de Stripe |
