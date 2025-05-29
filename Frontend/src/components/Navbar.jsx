import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    // Check if user is logged in (this could be from localStorage, context, etc.)
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging line to check token value
    if (token) {
      setIsLoggedIn(true);
    
    }
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
        >
          Book Review
        </Link>
      </div>

      {/* Right Side: Navigation Links */}
      <div className="flex items-center space-x-6">
        
          {isLoggedIn ? (
            <>
              <Link
                to="/addBook"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Add Book
              </Link>

              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Register
              </Link>
            </>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
