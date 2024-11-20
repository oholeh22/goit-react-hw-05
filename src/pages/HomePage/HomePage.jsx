import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../components/ApiService/ApiService';
import MovieList from '../../components/MovieList/MovieList';

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
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
