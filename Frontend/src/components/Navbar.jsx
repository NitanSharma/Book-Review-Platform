import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
            {/* Left Side: Logo */}
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
                    Book Review
                </Link>
            </div>

            {/* Right Side: Navigation Links */}
            <div className="flex items-center space-x-6">
                <Link
                    to="/register"
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                    Register
                </Link>
                <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                    Login
                </Link>
                <Link
                    to="/profile"
                    className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
                >
                   
                    Profile
                </Link>
                
            </div>
        </nav>
    );
};

export default Navbar;