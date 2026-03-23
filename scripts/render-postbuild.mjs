import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist/client')
const assetsDir = path.join(distDir, 'assets')
const files = fs.readdirSync(assetsDir)
const mainJs = files.find((f) => /^main-.*\.js$/.test(f))
const mainCss = files.find((f) => /^main-.*\.css$/.test(f))
if (!mainJs || !mainCss) throw new Error('No se encontraron main JS/CSS en dist/client/assets')
const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ClickWeb</title>
    <meta name="description" content="Crea webs profesionales, tiendas online y páginas para captar clientes en minutos con IA." />
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/assets/${mainCss}" />
  </head>
  <body>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>`
fs.writeFileSync(path.join(distDir, 'index.html'), html)
console.log('index.html generado para Render')
