const express = require('express')
// ---------------------------
const { disable } = require('./features.express')
const middlewares = require('./middlewares.express')
const routes = require('./routes.express')
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