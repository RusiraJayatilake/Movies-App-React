import React, { Component } from 'react'
import { saveMovie } from '../services/movies.service'; 

class AddMovies extends Component {
    
    handleInput = async (event) => {
        event.preventDefault();
        let title = document.getElementById('movie-title').value;
        let genre = document.getElementById('genre').value;
        let numberInStock = document.getElementById('numberOfStock').value;
        let ratings = document.getElementById('dailyRentalRate').value;

        const movieObj = {
            title: title,
            genre: genre,
            numberInStock: numberInStock,
            ratings: ratings
        };

        try {
            const savedMovieId = await saveMovie(movieObj);
            console.log("Movie saved with ID:", savedMovieId);
        } catch (error) {
            console.error("Failed to save movie:", error);
        }

    }

    render() { 
        return (
            <React.Fragment>
                <h1>Add a movie</h1>
                <form className='mt-5' onSubmit={this.handleInput}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" id="movie-title" required/>
                        <div id="emailHelp" className="form-text">Enter your favourite movie title</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input type="text" className="form-control" id="genre" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number In Stock</label>
                        <input type="text" className="form-control" id="numberOfStock" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rental Rate</label>
                        <input type="text" className="form-control" id="dailyRentalRate" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
            
        );
    }
}
 
export default AddMovies;