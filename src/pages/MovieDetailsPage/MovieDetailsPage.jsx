import { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/ApiService/ApiService';
import MovieCast from './MovieCast';
import MovieReviews from './MovieReviews';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const backLink = location.state?.from || '/';

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <p>Movie details not found.</p>;
  }

  return (
    <div>
      <button onClick={() => navigate(backLink)}>Go Back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      <nav>
        <Link to="cast" state={{ from: backLink }}>Cast</Link>
        <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
      </nav>

      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetailsPage;




