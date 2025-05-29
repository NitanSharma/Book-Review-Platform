import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary
import Button from "../components/Button";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/books/${id}`
        );
        console.log("Fetched book data:", res.data);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">Book not found.</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100 p-10">
        <div className="flex gap-8 h-full overflow-hidden">
          {/* Left Panel (Fixed Content) */}
          <div className="w-1/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center sticky top-10 h-fit">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Genre: {book.genre}
            </h2>
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-60 h-80 object-cover rounded-xl shadow-md mb-6"
            />
            <Button />
          </div>

          {/* Right Panel (Scrollable Content) */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg overflow-y-auto max-h-full">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Price: ${book.price}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>
            <h2 className="text-lg text-gray-700 mb-4">by {book.author}</h2>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>
      <ReviewForm bookId={id} />
      <ReviewList bookId={id} />
    </>
  );
};

export default BookDetails;
