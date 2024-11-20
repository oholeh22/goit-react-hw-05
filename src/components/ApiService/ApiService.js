import axios from "axios";

// Ваш ключ API
const API_KEY = '9659c5d15b44158a22fceb24a77e023b';
const BASE_URL = "https://api.themoviedb.org/3";

export const getFullImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// Функция для поиска трендовых фильмов
export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY },
    });

    return data.results; // Возвращаем список трендовых фильмов
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Функция для получения популярных фильмов
export const fetchPopularMovies = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY }, // Исправленный синтаксис
    });

    return data.results; // Возвращаем список популярных фильмов
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Функция для поиска фильмов по названию
export const searchMovies = async (query) => {
  console.log('Searching for:', query); // Логируем запрос
  try {
    // Проверим, что query не пустой
    if (!query) {
      console.log('Query is empty');
      return [];
    }

    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false, // Не включаем фильмы для взрослых
      },
    });

    console.log('Found movies:', data.results);
    return data.results; // Возвращаем найденные фильмы
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};

// Функция для получения деталей фильма по его ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY, language: "en-US" },
    });

    return data; // Возвращаем детали фильма
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Функция для получения актеров фильма по его ID
export const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY, language: "en-US" },
    });

    return data.cast; // Возвращаем список актеров
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

// Функция для получения отзывов о фильме по его ID
export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    return data.results; // Возвращаем список отзывов
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

// Функция для поиска фильмов (с axios)
export const fetchMovies = async (query) => {
  try {
    if (!query) {
      console.log('Query is empty');
      return [];
    }

    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false,
      },
    });

    return data.results; // Возвращаем результаты поиска
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Возвращаем пустой массив при ошибке
  }
};

