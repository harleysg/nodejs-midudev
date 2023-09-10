const crypto = require('node:crypto')
// -------------------------
const MOVIES = require('../sources/json/movies.json')
const { validateMovie, validateMoviePartial } = require('./schema/movie')
// -------------------------
module.exports = function router(app) {
  if (!app) return 
  // -------------------------
  app.get('/movies', (req, res) => {
    const { genre } = req.query

    if (genre) {
      const genrerFiltered = MOVIES.filter(
        movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
      )

      return res.json(genrerFiltered)

    }

    res.json(MOVIES)
  })
  // -------------------------
  app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = MOVIES.find(movie => movie.id === id)

    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  })
  // -------------------------
  app.delete('/movies/:id', (req, res) => {
    const body = req.body ?? {}
    const result = validateMoviePartial(body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
    
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    MOVIES.splice(movieIndex, 1)

    res.status(202).json({ message: 'Movie deleted' })
  })
  // -------------------------
  app.patch('/movies/:id', (req, res) => {
    const body = req.body ?? {}
    const result = validateMoviePartial(body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = MOVIES.findIndex(movie => movie.id === id)
    
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    const newMovie = {
      ...MOVIES[movieIndex],
      ...result.data
    }

    MOVIES[movieIndex] = newMovie

    res.status(201).json(newMovie)
  })
  // -------------------------
  app.post('/movies', (req, res) => {
    const { body } = req

    if (!body) {
      return res.json({ error: 'body undefined' })
    }

    const result = validateMovie(body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
      id: crypto.randomUUID(),
      ...result.data
    }

    MOVIES.push(newMovie)

    res.status(201).json(newMovie)
  })
  // -------------------------
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
}