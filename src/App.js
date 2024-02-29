import { BrowserRouter, Router, Route } from 'react-router-dom';
import Movies from './components/movies';
import AddMovies from './components/addMovies';

function App() {
  return (
    <main className='container'>
      <AddMovies />
    </main>
  );
}

export default App;
