import { extractUserAgent } from '../../sources/services/index.js'
// ---------------------------
export const userAgentHeader = (req, res) => {
  const clientInfo = extractUserAgent(req.headers['user-agent'])

  res.header('User-Agent', JSON.stringify(clientInfo))
}