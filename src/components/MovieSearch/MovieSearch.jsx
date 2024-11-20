// src/pages/MovieSearch/MovieSearch.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { fetchMovies } from '../../components/ApiService/ApiService'; // Замените на ваш реальный метод для получения фильмов
import css from './MovieSearch.module.css'; // Подключите стили, если есть

const MovieSearch = () => {
  const location = useLocation(); // Получаем текущее расположение URL
  const navigate = useNavigate(); // Для перенаправления
  const [movies, setMovies] = useState(() => {
    // Сохраняем состояние фильмов из sessionStorage (если оно есть)
    const savedMovies = sessionStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [loading, setLoading] = useState(false); // Индикатор загрузки
  const [error, setError] = useState(null); // Ошибка
  const [searchQuery, setSearchQuery] = useState(() => {
    // Сохраняем поисковый запрос из URL или sessionStorage
    const savedQuery = sessionStorage.getItem('searchQuery');
    return savedQuery || '';
  });

  // Извлекаем query из строки запроса URL
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (query) {
      setSearchQuery(query); // Устанавливаем query из URL
    }
  }, [query]);

  useEffect(() => {
    // Если query пустой, сбрасываем состояние
    if (!query) {
      setMovies([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMovies(query); // Выполняем запрос
        if (response && response.length > 0) {
          setMovies(response); // Устанавливаем фильмы в состояние
          // Сохраняем данные в sessionStorage
          sessionStorage.setItem('movies', JSON.stringify(response));
          sessionStorage.setItem('searchQuery', query);
        } else {
          setMovies([]);
          setError(`No movies found for "${query}".`);
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Вызываем функцию загрузки фильмов
  }, [query]);

  // Обработка формы поиска
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter a search term.');
      return;
    }

    // Обновляем URL с новым запросом
    navigate(`/movies?query=${searchQuery}`);
  };

  return (
    <div className={css.movieSearch}>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <ul className={css.movieList}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location }, // Передаем текущее положение
                }}
                className={css.movieLink}
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                  alt={movie.title}
                  className={css.moviePoster}
                />
                <h3 className={css.movieTitle}>{movie.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && movies.length === 0 && query && (
        <p>No movies found for "{query}".</p>
      )}
    </div>
  );
};

export default MovieSearch;

