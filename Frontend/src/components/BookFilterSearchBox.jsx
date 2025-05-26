import React, { useState } from "react";

const BookFilterSearchBox = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Replace the URL with your actual search API endpoint
            const response = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();
            if (onSearch) onSearch(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            // Handle error as needed
            if (onSearch) onSearch([]);
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full max-w-md mx-auto my-4"
        >
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
};

export default BookFilterSearchBox;