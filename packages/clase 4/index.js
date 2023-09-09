import express from 'express'
// ---------------------------
import { disable } from './features/index.js'
import middlewares from './middlewares/index.js'
import routes from './routes/index.js'
// ---------------------------
// ---------------------------
const app = express()
const PORT = process.env.PORT ?? 1234
// ---------------------------
disable(app, ['x-powered-by'])
middlewares(app)
// ---------------------------
routes(app)
// ---------------------------
app.listen(PORT, () => {
  console.log(`Listen: ${PORT}`);
})