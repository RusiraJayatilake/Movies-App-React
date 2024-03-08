import React from 'react'
import Like from './common/like.jsx';

const MoviesTable = (props) => {
    const { movies, onDelete, onLike, onSort } = props;

    return ( 
        <table className="table mt-4">
            <thead>
                <tr style={{cursor: 'pointer'}}>
                    <th onClick={() => onSort('title')} scope="col">Title</th>
                    <th onClick={() => onSort('genre.name')} scope="col">Genre</th>
                    <th onClick={() => onSort('numberInStock')} scope="col">Stock</th>
                    <th onClick={() => onSort('dailyRentalRate')} scope="col">Rate</th>
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
                                onClick={() => onLike(movie)} />
                        </td>
                        <td>
                            <button onClick={() => onDelete(movie._id)} className="btn btn-danger" >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
                        
        </table>
    );
}
  
export default MoviesTable;