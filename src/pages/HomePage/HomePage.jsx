import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPopularMovies } from '../../components/ApiService/ApiService';

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
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {popularMovies.map(movie => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }} // Передаємо поточне місце розташування
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
