import React, { Component } from 'react'

class AddMovies extends Component {
    
    handleInput = (event) => {
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

        console.log(movieObj);
    }

    render() { 
        return (
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
        );
    }
}
 
export default AddMovies;