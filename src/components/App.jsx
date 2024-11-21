import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { fetchPopularMovies, searchMovies } from './ApiService/ApiService';
import './App.css';
import MovieSearch from './MovieSearch/MovieSearch';

function Navigation() {
  return (
    <nav className="header-nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? 'active' : '')}>
        Movies
      </NavLink>
    </nav>
  );
}

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../pages/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../pages/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  const [popularMovies, setPopularMovies] = useState([]); 
  const [movies, setMovies] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        setPopularMovies(popularMovies);
        if (!isSearchPerformed) {
          setMovies([]); 
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    getMovies(); 
  }, [isSearchPerformed]); 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    setSearchQuery(query);
    if (query) {
      handleSearch(query); 
    }
  }, [location.search]);

  const handleSearch = async (query) => {
    if (query.trim() === '') { 
      setError('Please enter a movie name.');
      return; 
    }

    setError(''); 
    setSearchQuery(query);
    setLoading(true);
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setIsSearchPerformed(true); 
      navigate(`/movies?query=${query}`, { replace: true });
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={popularMovies} loading={loading} onMovieClick={handleMovieClick} />} />
          <Route
            path="/movies"
            element={
              <MovieSearch 
                onSearch={handleSearch} 
                setSearchQuery={setSearchQuery} 
                searchQuery={searchQuery} 
                movies={movies} 
                loading={loading} 
                onMovieClick={handleMovieClick} 
                error={error}
              />
            } 
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;



