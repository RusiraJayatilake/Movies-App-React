import React, { Component } from 'react'
import { getMovies, deleteMovie } from "../services/movies.service.js";
import Like from './common/like.jsx';
import Pagination from './common/pagination.jsx';
import { Paginate } from '../utils/paginate.js';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        currentPage: 1,
        pageSize: 3
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

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    render() { 
        const { pageSize, currentPage, movies: allMovies } = this.state;
        if (this.state.movies.length === 0) return <p>No movies in the database</p>;
        const movies = Paginate(allMovies, currentPage, pageSize);
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
                        {movies.map(movie => (
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
                <Pagination 
                    itemsCount={this.state.movies.length} 
                    pageSize={pageSize} 
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>   
        );
    }
}
 
export default Movies;