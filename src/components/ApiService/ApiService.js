import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjU5YzVkMTViNDQxNThhMjJmY2ViMjRhNzdlMDIzYiIsIm5iZiI6MTczMjExMDU1Ni43NjQyODE3LCJzdWIiOiI2NzNkYTE1MzI0NzkxN2U5NWIyYWZiNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.f-Inh6FqkT4cE5uReenStVvMwywiqOYDPx-eI8cx4W4';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w500';  

export const getFullImageUrl = (imagePath) => {
  if (imagePath) {
    return `${IMAGE_BASE_URL}${IMAGE_SIZE}${imagePath}`;
  }
  return '';
};


export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      headers: {
        Authorization: API_TOKEN,
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        query: query,
        include_adult: false,
      },
      headers: {
        Authorization: API_TOKEN,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: { Authorization: API_TOKEN },
  });
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: { Authorization: API_TOKEN },
  });
  return response.data.cast; 
}

export async function fetchMovieReviews(movieId) {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: { Authorization: API_TOKEN },
  });
  return response.data.results; 
}

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      query,
      language: 'en-US',
      include_adult: false,
    },
    headers: {
      Authorization: API_TOKEN,
    },
  });

  return response.data.results;
};

