import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../components/ApiService/ApiService';

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
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <a href={`/movies/${id}`}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;







