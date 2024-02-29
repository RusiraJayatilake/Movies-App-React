import { genres } from "../data/genreData";

export function getGenres() {
  return genres.filter(g => g);
}
