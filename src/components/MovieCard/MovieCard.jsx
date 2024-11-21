import { Link } from 'react-router-dom';

const MovieCard = ({ movie, location }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: location.pathname }}  
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
