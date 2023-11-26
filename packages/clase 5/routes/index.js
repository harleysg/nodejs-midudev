import { DefaultController } from '../controllers/default.js'
import { RouterMovies } from './movies.js'
// -------------------------
export default function router(app) {
  if (!app) return 
  // -------------------------
  app.use('/movies', RouterMovies)
  // -------------------------
  app.use(DefaultController.otherWise)
}