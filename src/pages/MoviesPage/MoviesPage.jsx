import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';  

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query') || '';
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery.trim()) return;

      try {
        setLoading(true);
        setError(null);
        console.log('Loading started...');

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${searchQuery}`);
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }

        console.log('Movies data loaded:', data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
        console.log('Loading finished...');
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/movies?query=${searchQuery}`);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for a movie"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {movies.length === 0 && !loading && searchQuery && !error && <p>No movies found.</p>}

      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />  
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;







