import mysql2 from 'mysql2/promise'
import { validateGenrePartial } from '../../schema/movie.js'
// -------------------------
const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'moviesdb'
}
const connection = await mysql2.createConnection(config)
// -------------------------
export class MovieModel {
  static async getAll({ genre }) {
    let movies = []
    const queryMovies = 'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;'

    try {
      const getAllMovies = async (query = queryMovies) => await connection.query(query)

      if (genre) {
        const zSchema = validateGenrePartial(genre.split(','))

        if (zSchema.error) {
          // TODO: Use mothod to record error
          console.log('👨‍🚀 ~ getAll ~ validate:', `Error: genre value: ${genre}, message: ${zSchema.error?.message}`)

          return movies
        } else {
          const { data } = zSchema
          const [movies_db] = await getAllMovies(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate, name as genres
              FROM movies
              INNER JOIN movie_genres ON movie_genres.movie_id = movies.id
              INNER JOIN genres ON genres.genre_id = movie_genres.movie_genre_id
              LIMIT 0, 10;`
          )

          const _movies = movies_db
            .filter(mov => data.includes(mov.genres))
            .reduce((prev, curr) => {
              prev[curr.id] = prev[curr.id] ?? {...curr, genre: []}
              prev[curr.id].genre.push(curr.genres)
              delete prev[curr.id].genres
              return prev
            }, {})

          movies = _movies
        }
      } else {
        const [db_table] = await getAllMovies()

        movies = db_table
      }
    } catch (error) {

    }

    return movies
  }
  static async getById({ id }) {}
  static async update({ id, input }) {}
  static async delete({ id }) {}
  static async create({ input }) {}
}