import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../components/ApiService/ApiService';
import style from './MovieReviews.module.css'

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
    <ul className={style.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={style.reviewItem}>
          <p className={style.author}><strong>{author}</strong></p>
          <p className={style.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;


