import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

const AddBook = () => {
  const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "Atomic Habits",
  author: "James Clear",
  description: "An easy and proven way to build good habits and break bad ones. Learn how small changes can lead to remarkable results.",
  genre: "Self-help",
  price: "16.99",
  publishedDate: "2018-10-16T00:00:00.000Z",
  ratings: "4.8",
  imageUrl: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            // Change the URL to your backend endpoint
           const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/books/`, form , {
            withCredentials : true
           });
                                             
                console.log(response.data);
            if(response.status === 201){
                setMessage("Book added successfully!");
                navigate('/');
            }

            setForm({
                title: "",
                author: "",
                description: "",
                genre: "",
                price: "",
                publishedDate: "",
                ratings: "",
                imageUrl: "",
            });
        } catch (error) {
            setMessage("Admin can add book.");
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
                {message && (
                    <div className="mb-4 text-center text-sm text-green-600">{message}</div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Published Date</label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={form.publishedDate}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Ratings</label>
                    <input
                        type="number"
                        name="ratings"
                        value={form.ratings}
                        onChange={handleChange}
                        required
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
                >
                    {loading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>

        </>
    );
};

export default AddBook;