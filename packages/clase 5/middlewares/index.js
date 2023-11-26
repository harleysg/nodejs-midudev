import { json } from './bodyparser.js'
import { corsMiddelware } from './cors.js';
import { userAgentHeader } from './userAgent.js'

// ---------------------------
export default function middelwares(app) {
  app.use(json());
  app.use(corsMiddelware());
  app.use((req, res, next) => {
    const { method, body, url } = req

    userAgentHeader(req, res)
  
    if (method === 'POST') {
      if (!body) {
        console.log('👨‍🚀 ~ post ~ body undefind', { url, error: 'body undefined' })
      }
    }
  
    next()
  })
}