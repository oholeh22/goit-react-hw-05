import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../components/ApiService/ApiService';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (err) {
        setError('Failed to load cast information.');
        console.error(err);
      }
      setLoading(false);
    };

    getCast();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cast.length) return <div>No cast information available.</div>;

  return (
    <ul>
      {cast.map(({ id, name, character }) => (
        <li key={id}>
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
