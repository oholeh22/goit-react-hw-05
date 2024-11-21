import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/ApiService/ApiService';
import css from './MovieDetailsPage.module.css'; 

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovieDetails(movieData);
      } catch (err) {
        setError('Error fetching movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const backPath = location.state?.from || '/';
    navigate(backPath);
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movieDetails) return <p>Movie details not found.</p>;

  return (
    <div className={css.movieDetails}>
      <button onClick={handleGoBack} className={css.goBackButton}>Go Back</button>
      <h2>{movieDetails.title}</h2>
      <img
        className={css.moviePoster}
        src={
          movieDetails.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            : 'https://via.placeholder.com/500x750'
        }
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>
      <p>Release date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}</p>

      <nav className={css.movieNav}>
        <Link to="cast" className={css.navLink} state={{ from: location.state?.from }}>Cast</Link>
        <Link to="reviews" className={css.navLink} state={{ from: location.state?.from }}>Reviews</Link>
      </nav>

      <Outlet /> 
    </div>
  );
};

export default MovieDetailsPage;









