import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../components/ApiService/ApiService';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      setLoading(false);
    };

    getReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
