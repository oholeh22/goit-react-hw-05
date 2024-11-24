import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPopularMovies } from '../../components/ApiService/ApiService';
import MovieList from '../../components/MovieList/MovieList'; 
import style from './HomePage.module.css'

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        setError('Failed to load popular movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className={style.popularMoviesTitle}>Popular Movies</h1>

      <MovieList movies={popularMovies} />
    </div>
  );
}

export default HomePage;
