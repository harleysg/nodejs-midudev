const dittoJSON = require('./sources/ditto.json')
const contentJSONType = { 'Content-Type': 'application/json; charset=utf-8' }

const ROUTES_BY_METHOD = {
  GET: {
    '/pokemon/ditto': (req, res) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.end(JSON.stringify(dittoJSON, null, 2))
    }
  },
  POST: {
    '/pokemon': (req, res) => {
      let body = ''

      // Listen the data event
      req.on('data', chunk => {
        body += chunk.toString()
      })

      req.on('end', () => {
        const data = JSON.parse(body)
        data.timestamp = Date.now()

        res.writeHead(201, contentJSONType)
        res.end(JSON.stringify(data))
      })
    }
  }
}

module.exports = {
  ROUTES_BY_METHOD
}
