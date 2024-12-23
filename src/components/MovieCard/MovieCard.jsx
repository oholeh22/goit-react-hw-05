import { Link } from 'react-router-dom';
import style from './MovieCard.module.css'

const getFullImageUrl = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

const MovieCard = ({ movie, location }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: location.pathname }}
      className={style.movieCard}  
    >
      <img
        src={getFullImageUrl(movie.poster_path)}
        alt={movie.title}
        className={style.moviePoster}
      />
      <h3 className={style.movieTitle}>{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
