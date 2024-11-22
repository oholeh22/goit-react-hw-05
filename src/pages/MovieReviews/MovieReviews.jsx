import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../components/ApiService/ApiService';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const reviewData = await fetchMovieReviews(movieId);
        setReviews(reviewData);
      } catch (err) {
        setError('Failed to load reviews.');
        console.error(err);
      }
      setLoading(false);
    };

    getReviews();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!reviews.length) return <div>No reviews available.</div>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p><strong>{author}</strong></p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;


