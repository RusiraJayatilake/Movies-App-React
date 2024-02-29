import { getGenres } from "./genre.service";
import * as moviesAPI from "../data/moviesData";


export function getMovies() {
  return moviesAPI;
}

export function getMovie(id) {
  return moviesAPI.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = moviesAPI.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = getGenres.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    moviesAPI.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = moviesAPI.find(m => m._id === id);
  moviesAPI.splice(moviesAPI.indexOf(movieInDb), 1);
  return movieInDb;
}
