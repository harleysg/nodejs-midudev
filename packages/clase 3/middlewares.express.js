const bodyParser = require('body-parser')
// ---------------------------
const rudimentaryCORS = (req, res) => {
  const origin = req.header('origin')
  
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin ?? '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
}
// ---------------------------
const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS ?? ['*', 'http://localhost:8080']
// ---------------------------
module.exports = function middelwares(app) {
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    const { method, body, url } = req
  
    rudimentaryCORS(req, res)
  
    if (method === 'POST') {
      if (!body) {
        console.log('👨‍🚀 ~ post ~ body undefind', { url, error: 'body undefined' })
      }
    }
  
    next()
  })
  app.options('/movies/:id', (req, res) => {
    rudimentaryCORS(req, res)

    res.sendStatus(200)
  })
}
