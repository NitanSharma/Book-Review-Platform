import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user: '',
    book: '',
    rating: '',
    comment: 'Nothing can stop us from reading!',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    console.log('Submitting review:', form);
    try {
      const response = await axios.post('http://localhost:3000/reviews', form);
      console.log(response);
      if(response.status === 201) {
        setMessage('Review submitted successfully!');
        console.log(response.data);
        navigate('/'); // Redirect to books page after successful submission
      }
      
      setForm({
        user: '',
        book: '',
        rating: '',
        comment: '',
      });
    } catch (err) {
      setMessage('Failed to submit review.' + (err.response ? ` Error: ${err.response.data.message}` : ''));
      console.error('Error submitting review:', err);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Submit a Review</h2>
      <div>
        <label className="block mb-1 font-medium">User ID</label>
        <input
          type="text"
          name="userId"
          value={form.user}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Book ID</label>
        <input
          type="text"
          name="bookId"
          value={form.book}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Rating (1-5)</label>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
      {message && (
        <div className="mt-2 text-center text-sm text-green-600">{message}</div>
      )}
    </form>
  );
};

export default ReviewForm;