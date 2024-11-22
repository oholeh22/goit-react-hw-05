import { Link, useLocation } from 'react-router-dom';

function MovieList({ movies }) {
  const location = useLocation();

  if (!movies.length) {
    return <p>No movies found. Please try searching for something else.</p>;
  }

  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }} 
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;


