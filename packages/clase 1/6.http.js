const http = require('node:http') // protocolo HTTP
const { findAvailablePort } = require('./7.free-port.js')
const useragent = require('express-useragent')
const pc = require('picocolors')

const desiredPort = process.env.PORT ?? 3000

function extractUserAgent (clientInfo) {
  const { browser, os, platform, version, isMobile, isTablet, isDesktop } = useragent.parse(clientInfo)
  const device = isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : ''

  return { browser: `${browser} - ${version}`, os, platform, device }
}

const server = http.createServer((req, res) => {
  const clientInfo = extractUserAgent(req.headers['user-agent'])
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`You're using ${JSON.stringify(clientInfo, '', 2)}`)
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(pc.green(`server listening on port http://localhost:${port}`))
  })
})
