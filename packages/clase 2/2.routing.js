const http = require('node:http')

const { ROUTES_BY_METHOD } = require('./sources/route_actions')

const PORT = process.env.PORT ?? 1234
const contentHTMLType = { 'Content-Type': 'text/html; charset=utf-8' }

const resolveRoutes = (req, res) => {
  const { method, url } = req

  const REQUEST_BY_METHOD = ROUTES_BY_METHOD[method]

  if (REQUEST_BY_METHOD) {
    const ROUTE = REQUEST_BY_METHOD[url]

    if (ROUTE) {
      return ROUTE(req, res)
    } else {
      res.writeHead(200, contentHTMLType)
      return res.end('Fail')
    }
  } else {
    res.writeHead(200, contentHTMLType)
    return res.end('Fail - Method not defined')
  }
}

const server = http.createServer(resolveRoutes)

server.listen(PORT, () => {
  console.log(`Listen port: ${PORT}`)
})
