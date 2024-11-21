import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../components/ApiService/ApiService'; 

const MovieReviews = () => {
  const { movieId } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetchMovieReviews(movieId); 
        setReviews(response.results || []); 
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false); 
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No Reviews</p> 
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
