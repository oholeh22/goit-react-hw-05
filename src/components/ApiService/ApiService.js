import axios from "axios";

const API_KEY = '9659c5d15b44158a22fceb24a77e023b';
const BASE_URL = "https://api.themoviedb.org/3";

export const getFullImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY },
    });

    return data.results; 
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY }, 
    });

    return data.results; 
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  console.log('Searching for:', query); 
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

    console.log('Found movies:', data.results);
    return data.results; 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; 
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY, language: "en-US" },
    });

    return data; 
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY, language: "en-US" },
    });

    return data.cast; 
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    return data.results; 
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

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

    return data.results; 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

