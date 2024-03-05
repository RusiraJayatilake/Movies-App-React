import React, { Component } from 'react'
import { getMovies, deleteMovie } from "../services/movies.service.js";
import Like from './common/like.jsx';

class Movies extends Component {
    state = { 
        movies: getMovies()
    };

    handleDelete = (movieId) => {
        deleteMovie(movieId)
        // Update the state to remove the deleted movie from the UI
        this.setState(prevState => ({
            movies: prevState.movies.filter(movie => movie._id !== movieId)
        }));
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    render() { 
        if (this.state.movies.length === 0) return <p>No movies in the database</p>;
        return (
            <React.Fragment>
                <h1>Movies Section</h1>
                <div>
                    <span>Number of movies: <b>{this.state.movies.filter(m => m.title).length}</b></span>
                    <br/>
                    <span>Liked movies: <b>{this.state.movies.filter(m => m.liked).length}</b></span>
                </div>
                
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Favourites</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like 
                                        liked={movie.liked}
                                        onClick={() => this.handleLike(movie)} />
                                </td>
                                <td>
                                    <button onClick={() => this.handleDelete(movie._id)} className="btn btn-danger" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>   
            
        );
    }
}
 
export default Movies;