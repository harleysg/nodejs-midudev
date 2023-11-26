import { MovieModel } from '../models/sql/movies.js'
// -------------------------
import { validateMovie, validateMoviePartial } from '../schema/movie.js'
// -------------------------
export class MoviesController {
  // -------------------------
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
  
    res.json(movies)
  }
  // -------------------------
  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({id})
  
    if (movie) return res.json(movie)
  
    res.status(404).json({ message: 'Movie not found' })
  }
  // -------------------------
  static async delete(req, res) {
    const { id } = req.params
    const movie = await MovieModel.delete({ id })
  
    if (movie.error) {
      return res.status(422).json({ error: movie.error })
    }
  
    res.status(202).json(movie.message)
  }
  // -------------------------
  static async update(req, res) {
    const body = req.body ?? {}
    const { id } = req.params
    const result = validateMoviePartial(body)

    if (result.error) {
      return res.status(422).json({ error: result.error.message })
    }

    const movie = await MovieModel.update({ id, input: result.data })

    if (movie.error) {
      return res.status(422).json({ error: movie.message })
    }

    return res.status(201).json(movie.data)
  }
  // -------------------------
  static async create(req, res){
    const { body } = req

    if (!body) {
      return res.json({ error: 'body undefined' })
    }

    const result = validateMovie(body)

    if (result.error) {
      return res.status(422).json({
        error: result.error.message
      })
  }

    const movie = await MovieModel.create({ input: result.data })

    res.status(201).json(movie.data)
  }
  // -------------------------
  static async otherWise(req, res) {
    res.status(404).json({ message: 'Not found' })
  }
}