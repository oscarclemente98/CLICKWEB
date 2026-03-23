import { createServer } from './dist/server/server.js'
import apiServer from './server.js'

const PORT = process.env.PORT || 3000

const handler = await createServer()

apiServer.use(handler)

apiServer.listen(PORT, () => {
  console.log(`ClickWeb SSR corriendo en http://localhost:${PORT}`)
})
