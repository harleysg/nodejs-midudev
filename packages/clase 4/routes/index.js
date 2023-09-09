import { RouterMovies } from './movies.js'
// -------------------------
export default function router(app) {
  if (!app) return 
  // -------------------------
  app.use('/movies', RouterMovies)
  // -------------------------
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
}