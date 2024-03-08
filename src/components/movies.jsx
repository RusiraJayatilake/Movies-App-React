import React, { Component } from 'react'
import { getMovies, deleteMovie } from "../services/movies.service.js";
import { getGenres } from '../services/genre.service.js';
import Pagination from './common/pagination.jsx';
import { Paginate } from '../utils/paginate.js';
import ListGroup from './common/listgroup.jsx';
import MoviesTable from './moviesTable.jsx';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 3,
        sortCol: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: '', name: 'All Genres'}, ...getGenres()];
        this.setState({
            movies: getMovies(), genres
        });
    }

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
    };

    handleGenreSelect = (item) => {
        this.setState({ selectedGenre: item, currentPage: 1 })
    };

    handleSort = (path) => {
        const sortColumn = {...this.state.sortCol};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc': 'asc;'    
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        } 
        this.setState({ sortColumn: sortColumn }) // fix sorting issue
    };

    render() { 
        const { pageSize, currentPage, selectedGenre, sortCol, movies: allMovies } = this.state;
        if (this.state.movies.length === 0) return <p>No movies in the database</p>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortCol.path], [sortCol.order]); 
        const movies = Paginate(sorted, currentPage, pageSize);
        
        return (
            <div className='row gap-4'>
                <div className='col-2 mt-5'>
                    <ListGroup 
                        items={this.state.genres}
                        textProperty="name"
                        valueProperty="_id"
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                
                <div className='col'>
                    <h1>Movies Section</h1>
                    <div>
                        <span>Number of movies: <b>{filtered.length}</b></span>
                        <br/>
                        <span>Favourite movies: <b>{this.state.movies.filter(m => m.liked).length}</b></span>
                    </div>
                    
                    <MoviesTable 
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    
                    <Pagination 
                        itemsCount={filtered.length} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>   
        );
    }
}
 
export default Movies;