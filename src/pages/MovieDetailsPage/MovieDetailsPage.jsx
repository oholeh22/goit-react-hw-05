import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { fetchMovieDetails } from '../../components/ApiService/ApiService';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <button onClick={() => window.history.back()}>Go Back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <h3>Additional Information</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLinkRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkRef.current }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;











