import { z } from 'zod'
import require from '../../sources/utils/index.js'
// --------------------------
const GENRE_SCHEME = require('../../sources/json/genres.json')
// --------------------------
const _MOVIE_SCHEMA = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string({
    invalid_type_error: 'Movie director must be a string',
  }),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.enum(GENRE_SCHEME).array().default(['']),
  rate: z.number().min(0).max(10).default(0),
  duration: z.number().positive(),
})

const _GENRE_SCHEMA = z.enum(GENRE_SCHEME).array().default([''])

export function validateGenrePartial(genr) {
  return _GENRE_SCHEMA.safeParse(genr)
}

export function validateMovie(params) {
  return _MOVIE_SCHEMA.safeParse(params)
}

export function validateMoviePartial(object) {
  return _MOVIE_SCHEMA.partial().safeParse(object)
}
