import { Router } from 'express'
// -------------------------
import { MoviesController } from '../controllers/movies.js'
// -------------------------
export const RouterMovies = new Router()
// -------------------------
RouterMovies.get('/', MoviesController.getAll)
// -------------------------
RouterMovies.post('/', MoviesController.create)
// -------------------------
RouterMovies.get('/:id', MoviesController.getById)
// -------------------------
RouterMovies.delete('/:id', MoviesController.delete)
// -------------------------
RouterMovies.patch('/:id', MoviesController.update)
// -------------------------
RouterMovies.use(MoviesController.otherWise)