import cors from 'cors'

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS ?? ["http://localhost:8080"]

export function corsMiddelware ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
}
// ---------------------------
export const rudimentaryCORS = (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin ?? '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
}
