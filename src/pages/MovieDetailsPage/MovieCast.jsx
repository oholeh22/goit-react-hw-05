import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../components/ApiService/ApiService';

function MovieCast() {
  const { movieId } = useParams(); 
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const castData = await fetchMovieCast(movieId); 
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
      setLoading(false);
    };

    getCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading cast...</div>;
  }

  if (!cast.length) {
    return <p>No cast information available for this movie.</p>;
  }

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              width="50"
            />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
