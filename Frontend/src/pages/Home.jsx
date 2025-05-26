import Navbar from "../components/Navbar"
import ReviewForm from "../components/ReviewForm"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookFilterSearchBox from "../components/BookFilterSearchBox";


const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books");
        // Assuming the response data is an array of book objects
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getBooks();

  }, []);

  return (
    <div>
      <Navbar />
      <BookFilterSearchBox onSearch={setBooks} />
      <div className="py-6 bg-blue-300 mt-10 w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Welcome to Book Review</h1>  
        <div className="flex mb-6 flex-wrap gap-5 justify-center">
          {books.map(book => (
            <div key={book._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center h-80 w-48">
              <img onClick={() => {navigate(`/books/${book._id}`)}}
                src={book.imageUrl}
                alt={book.title}
                className="h-[80%] w-full rounded mb-2"
              />
              <h2 className="text-md font-semibold">{book.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Home