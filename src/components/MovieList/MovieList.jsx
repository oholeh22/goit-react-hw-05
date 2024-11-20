import { useNavigate } from 'react-router-dom';
import { getFullImageUrl } from '../../components/ApiService/ApiService';
import css from './MovieList.module.css';

function MovieList({ movies, onMovieClick }) {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    if (onMovieClick) {
      onMovieClick(movieId);
    } else {
      navigate(`/movies/${movieId}`);
    }
  };

  return (
    <div className={css.movieList}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.movieCard}>
          <img
            src={getFullImageUrl(movie.poster_path)}
            alt={movie.title}
            onClick={() => handleMovieClick(movie.id)}
            style={{ cursor: 'pointer' }}
          />
          <h2>{movie.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default MovieList;

