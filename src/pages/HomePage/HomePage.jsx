import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../components/ApiService/ApiService';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css'
import { Link } from 'react-router-dom';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.trending_container}>
    <h1>Trending Movies</h1>
    <ul className={css.movie_list}>
  {movies.map((movie) => (
    <li key={movie.id} className={css.movie_card}>
      <Link to={`/movies/${movie.id}`} className={css.movie_link}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/200'
          }
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
      </Link>
    </li>
  ))}
</ul>
  </div>
  )
}

export default HomePage;
