import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews } from '../../components/ApiService/ApiService';
import css from './MovieDetailsPage.module.css'; // используем обычный CSS

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем поисковый запрос из location.search
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovieDetails(movieId);
        setMovieDetails(movieData);
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError('Error fetching movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  // Логика кнопки "Go Back"
  const handleGoBack = () => {
    if (location.state?.from) {
      // Если пришли с поиска, возвращаемся на страницу поиска
      navigate(location.state.from, { replace: true });
    } else {
      // Если не было перехода с поиска, возвращаемся на главную
      navigate('/', { replace: true });
    }
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
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>
      <p>Release date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}</p>

      {/* Ссылки на Cast и Reviews */}
      <nav className={css.movieNav}>
        <Link to="cast" className={css.navLink}>Cast</Link>
        <Link to="reviews" className={css.navLink}>Reviews</Link>
      </nav>

      <div className={css.movieContent}>
        {location.pathname.includes('cast') && (
          <div>
            <h3>Cast</h3>
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>
                  <p>{actor.name} as {actor.character}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {location.pathname.includes('reviews') && (
          <div>
            <h3>Reviews</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p><strong>{review.author}</strong> says:</p>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;









