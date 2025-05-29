import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/reviews?bookId=${bookId}`);
        console.log(response.data);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
        console.log(err);
      }
    };

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  if (loading) {
    return <div className="text-center py-8 text-blue-600 font-medium">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-gray-500">No reviews found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
  <h2 className="text-2xl font-semibold mb-4 text-center">Book Reviews</h2>
  <div className="space-y-4">
    {reviews.map((review) => (
      <div
        key={review._id}
        className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
      >
        {/* Name and Rating Row */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-700">
            {review.user?.name || 'Anonymous'}
          </h3>
          <span className="text-yellow-500 font-medium">
            ⭐ {review.rating || 'N/A'}
          </span>
        </div>

        <p className="text-gray-600 mt-2">{review.comment || 'No content provided.'}</p>
        <p className="text-sm text-gray-400 mt-1">Book: {review.book?.title}</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default ReviewList;
