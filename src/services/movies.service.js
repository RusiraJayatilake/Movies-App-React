import { getGenres } from "./genre.service";
import * as moviesAPI from "../data/moviesData";
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

export function getMovies() {
  return moviesAPI;
}

export function getMovie(id) {
  return moviesAPI.find(m => m._id === id);
}

export const saveMovie = async (movie) => {
  try{
    console.log("Saving movie:", movie); // Log movie object for debugging
    
    const docRef = await addDoc(collection(db, "movies"), {
      name: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    });

    return docRef.id;

  } catch (err){
    throw new Error("Fail to add db", err);
  }
}

export function deleteMovie(id) {
  let movieInDb = moviesAPI.find(m => m._id === id);
  moviesAPI.splice(moviesAPI.indexOf(movieInDb), 1);
  return movieInDb;
}


  // let movieInDb = moviesAPI.find(m => m._id === movie._id) || {};
  // movieInDb.name = movie.name;
  // movieInDb.genre = getGenres.genres.find(g => g._id === movie.genreId);
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;

  // if (!movieInDb._id) {
  //   movieInDb._id = Date.now();
  //   moviesAPI.push(movieInDb);
  // }

  // return movieInDb;