import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Adjust the import path as necessary

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/${id}`);
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
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-gray-50 p-6 bg-red-500">
        <div className="md:w-1/2 w-full flex justify-center bg-white p-6">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-72 h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start md:pr-12 mb-8 md:mb-0 bg-blue-100 p-6 rounded-lg shadow-lg mr-10">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <h2 className="text-xl text-gray-700 mb-2">by {book.author}</h2>
        <p className="text-gray-600">{book.description}</p>
      </div>
    </div>
    </>
  );
};

export default BookDetails;