import crypto from 'node:crypto'
import { createRequire } from 'node:module'
// -------------------------
const require = createRequire(import.meta.url)
const MOVIES = require('../../sources/json/movies.json')
// -------------------------
export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return MOVIES.filter(
        movie => movie.genre.some(g => genre.toLocaleLowerCase().includes(g.toLocaleLowerCase()))
      )
    }

    return MOVIES
  }
  static async getById({ id }) {
    return MOVIES.find(movie => movie.id === id)
  }
  static async update({ id, input }) {
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
    
    if (movieIndex === -1) return { 
      error: 'Movie not found',
      message: 'Movie not found'
    }

    const newMovie = {
      ...MOVIES[movieIndex],
      ...input
    }
  
    MOVIES[movieIndex] = newMovie

    return {
      data: newMovie,
      message: 'Movie updated'
    }
  }
  static async delete({ id }) {
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return { 
        error: 'Movie not found',
        message: 'Movie not found'
      }
    }

    MOVIES.splice(movieIndex, 1)

    return { message: 'Movie deleted' }
  }
  static async create({ input }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }

    MOVIES.push(newMovie)

    return {
      data: newMovie,
      message: 'Movie created'
    }
  }
}
