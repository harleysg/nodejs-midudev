const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')
const useragent = require('express-useragent')
const pc = require('picocolors')

const desiredPort = process.env.PORT ?? 1234

function extractUserAgent (ua) {
  const userAgentOrigin = useragent.parse(ua)
  const regex = /^is/gm
  const uaAnalyze = Object
    .entries(userAgentOrigin)
    .filter(([key, value]) => {
      const acceptedEntries = {}
      if (key.match(regex) && value) {
        acceptedEntries.key = value
        return acceptedEntries
      } else if (!key.match(regex) && key !== 'geoIp' && key !== 'source' && value !== '') {
        acceptedEntries.key = value
        return acceptedEntries
      }

      return null
    })

  return Object.fromEntries(uaAnalyze)
}

const server = http.createServer((req, res) => {
  const clientInfo = extractUserAgent(req.headers['user-agent'])
  const contentType = { 'Content-Type': 'text/html; charset=utf-8' }
  res.writeHead(200, contentType)

  if (req.url === '/') {
    res.end(`Home - <pre>You're using ${JSON.stringify(clientInfo, '', 2)}</pre>`)
  } else if (req.url === '/contacto') {
    res.end(`Contacto - <pre>You're using ${JSON.stringify(clientInfo, '', 2)}</pre>`)
  } else if (req.url === '/imagen-gatito') {
    fs.readFile('./sources/gatito.jpeg', (error, data) => {
      if (error) {
        res.writeHead(500, contentType)
        res.end(`Image not founded - <pre>You're using ${JSON.stringify(clientInfo, '', 2)}</pre>`)
      } else {
        res.writeHead(200, { 'Content-Type': 'image/avif,image/webp,image/apng,image/jpeg; charset=utf-8' })
        res.end(data)
      }
    })
  } else {
    res.writeHead(404, contentType)
    res.end(`Fail - <pre>You're using ${JSON.stringify(clientInfo, '', 2)}</pre>`)
  }
})

server.listen(desiredPort, () => {
  console.log(pc.green(`server listening on port http://localhost:${desiredPort}`))
})
