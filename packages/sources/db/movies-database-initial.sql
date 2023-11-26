-- Creation
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
-- ------------------------------------------------------------------------
-- Use
USE moviesdb;
-- ------------------------------------------------------------------------
-- Create table movies
-- "id": "dcdd0fad-a94c-4810-8acc-5f108d3b18c3",
-- "title": "The Shawshank Redemption",
-- "year": 1994,
-- "director": "Frank Darabont",
-- "duration": 142,
-- "poster": "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
-- "genre": ["Drama"],
-- "rate": 9.3
-- ------------------------------------------------------------------------
CREATE TABLE movies (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
);
-- ------------------------------------------------------------------------
CREATE TABLE genres (
  genre_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);
-- ------------------------------------------------------------------------
CREATE TABLE movie_genres (
  movie_id BINARY(16) REFERENCES movies(id),
  movie_genre_id INT REFERENCES genres(genre_id),
  PRIMARY KEY (movie_id, movie_genre_id)
);
-- ------------------------------------------------------------------------
INSERT INTO genres (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi');
-- ------------------------------------------------------------------------
INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES
  (UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
  (UUID_TO_BIN(UUID()), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
  (UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
  (UUID_TO_BIN(UUID()), "Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9);
-- ------------------------------------------------------------------------
INSERT INTO movie_genres (movie_id, movie_genre_id) VALUES
  ( (SELECT id FROM movies WHERE title = 'Inception'), (SELECT genre_id FROM genres WHERE name = 'Sci-Fi') ),
  ( (SELECT id FROM movies WHERE title = 'Inception'), (SELECT genre_id FROM genres WHERE name = 'Action') ),
  ( (SELECT id FROM movies WHERE title = 'The Shawshank Redemption'), (SELECT genre_id FROM genres WHERE name = 'Drama') ),
  ( (SELECT id FROM movies WHERE title = 'The Dark Knight'), (SELECT genre_id FROM genres WHERE name = 'Action') ),
  ( (SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT genre_id FROM genres WHERE name = 'Crime') ),
  ( (SELECT id FROM movies WHERE title = 'Pulp Fiction'), (SELECT genre_id FROM genres WHERE name = 'Action') );
-- ------------------------------------------------------------------------  
-- SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;
-- SELECT BIN_TO_UUID(movie_id) movie_id, movie_genre_id FROM movie_genres;
-- SELECT BIN_TO_UUID(movie_id) movie_id FROM movie_genres WHERE movie_genre_id = 2;
-- SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate, movie_genre_id as genre_id FROM movies INNER JOIN movie_genres ON movie_genres.movie_id = movies.id;
-- SELECT genre_id, name, movie_genre_id FROM genres INNER JOIN movie_genres ON movie_genres.movie_genre_id = genres.genre_id;
-- ------------------------------------------------------------------------
SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate, name
  FROM movies
  INNER JOIN movie_genres ON movie_genres.movie_id = movies.id
  INNER JOIN genres ON genres.genre_id = movie_genres.movie_genre_id
  LIMIT 0, 10;
  