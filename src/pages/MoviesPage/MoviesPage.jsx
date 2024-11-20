import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MoviesPage = ({ onSearch, setSearchQuery, searchQuery, movies, loading, onMovieClick, error }) => {
  const location = useLocation(); // Получаем текущий маршрут
  const navigate = useNavigate();

  // Функция для загрузки фильмов
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Loading started...');
        setLoading(true); // Устанавливаем состояние loading в true
        const response = await fetch(`your-api-endpoint?query=${searchQuery}`);
        const data = await response.json();
        console.log('Movies data loaded:', data);
        setMovies(data.results); // Обновляем состояние с фильмами
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false); // Устанавливаем loading в false после завершения загрузки
        console.log('Loading finished...');
      }
    };

    fetchMovies();
  }, [searchQuery]); // Эффект будет запускаться, когда меняется searchQuery

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
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a movie"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {movies.length === 0 && !loading && searchQuery && !error && <p>No movies found.</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => onMovieClick(movie.id)}>
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;






