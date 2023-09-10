const bodyParser = require('body-parser')
const extractUserAgent = require('../sources/services/index.js')
// ---------------------------
const rudimentaryCORS = (req, res) => {
  const origin = req.header('origin')
  const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS ?? ['http://localhost:8080']
  
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin ?? '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
}
// ---------------------------
const userAgentHeader = (req, res) => {
  const clientInfo = extractUserAgent(req.headers['user-agent'])

  res.header('User-Agent', JSON.stringify(clientInfo))
}
// ---------------------------
module.exports = function middelwares(app) {
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    const { method, body, url } = req
  
    rudimentaryCORS(req, res)
    userAgentHeader(req, res)
  
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
