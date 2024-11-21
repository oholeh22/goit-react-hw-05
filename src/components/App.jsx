import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
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
  const [popularMovies, setPopularMovies] = useState([]); // Для хранения популярных фильмов
  const [movies, setMovies] = useState([]); // Для фильмов по поисковому запросу
  const [searchQuery, setSearchQuery] = useState(''); // Для отслеживания поискового запроса
  const [loading, setLoading] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // Флаг, чтобы показать фильмы только после поиска
  const [error, setError] = useState(''); // Для отслеживания ошибок
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем популярные фильмы при монтировании компонента
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        setPopularMovies(popularMovies); // Загружаем популярные фильмы только один раз
        if (!isSearchPerformed) {
          setMovies([]); // Если поиск еще не выполнен, список фильмов пуст
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    getMovies(); // Загружаем фильмы только один раз при монтировании компонента
  }, [isSearchPerformed]); // Перезагружаем только если поиск выполнен

  // Получаем query-параметр из URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    setSearchQuery(query);
    if (query) {
      handleSearch(query); // Если в URL есть запрос, сразу выполняем поиск
    }
  }, [location.search]);

  // Обработчик поиска
  const handleSearch = async (query) => {
    if (query.trim() === '') { // Если поле пустое
      setError('Please enter a movie name.');
      return; // Останавливаем выполнение поиска
    }

    setError(''); // Сбрасываем ошибку, если запрос не пустой
    setSearchQuery(query);
    setLoading(true);
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setIsSearchPerformed(true); // Флаг поиска
      // Обновляем URL с параметром запроса
      navigate(`/movies?query=${query}`, { replace: true });
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  // Обработчик клика по фильму
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
                onSearch={handleSearch}  // Используем handleSearch прямо
                setSearchQuery={setSearchQuery} // Передаем setSearchQuery в MoviesPage
                searchQuery={searchQuery} 
                movies={movies} 
                loading={loading} 
                onMovieClick={handleMovieClick} 
                error={error} // Передаем ошибку в MoviesPage
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



