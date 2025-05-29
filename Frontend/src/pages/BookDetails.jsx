import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary
import Button from "../components/Button";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/${id}`);
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
    <Navbar/>
    <div className="bg-gray-50 h-screen m-10 flex justify-around">
        <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Genre: {book.genre}</h2>
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-72 h-90 object-cover rounded-lg shadow-lg"
        />
     <Button/>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Price: ${book.price}</h2>
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <h2 className="text-xl text-gray-700 mb-2">by {book.author}</h2>
        <p className="text-gray-600">{book.description}</p>
      </div>
    </div>
    </>
  );
};

export default BookDetails;