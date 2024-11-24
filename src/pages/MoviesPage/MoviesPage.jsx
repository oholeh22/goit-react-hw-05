import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../components/ApiService/ApiService';
import MovieList from '../../components/MovieList/MovieList'; 
import style from './MoviesPage.module.css'

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      fetchMovies(query);
    }
  }, [searchParams]);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError('');
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError('Error fetching movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setError('Please enter a valid search query.');
      return;
    }
    setError('');
    setSearchParams({ query });
    navigate(`/movies?query=${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={style.formWrapper}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={style.searchInput}
        />
        <button type="submit" className={style.searchButton}>Search</button>
      </form>

      {loading && <div className={style.loading}>Loading...</div>}
      {error && <div className={style.error}>{error}</div>}

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;







