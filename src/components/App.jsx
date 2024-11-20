import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { fetchPopularMovies, searchMovies } from './ApiService/ApiService'; 
import './App.css';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
    </nav>
  );
}

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../pages/MovieDetailsPage/MovieCast'));
const MovieReviews = lazy(() => import('../pages/MovieDetailsPage/MovieReviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query); 
    if (query === '') {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    } else {
      setLoading(true);
      try {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} loading={loading} />} />
          <Route
            path="/movies"
            element={<MoviesPage onSearch={handleSearch} searchQuery={searchQuery} movies={movies} loading={loading} />}
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


