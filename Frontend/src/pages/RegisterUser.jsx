import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserDataContext } from "../context/UserContext"; 


const RegisterUser = () => {
  const navigate = useNavigate();
  // State to manage form inputs and submission status
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const {user , setUser} =React.useContext(UserDataContext);
  // console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Change the URL to your backend endpoint
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, form , {
        withCredentials: true, // Include credentials for cookie handling
      });
      setSuccess("Registration successful!");

      if(response.status === 201) {
        const data = response.data;
        // console.log(data);
        setUser(data.user);
        localStorage.setItem('token', data.token); // Store token in localStorage
        // console.log('Registration successful:', response.data);
          setTimeout(() => {
          navigate("/");
         }, 100); // Give React time to update context
      }
      // Reset form fields after successful registration
      setForm({
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
    setLoading(false);
  };

//   React.useEffect(() => {
//   console.log("User updated:", user);
// }, [user]);

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={form.isAdmin}
            onChange={handleChange}
            className="mr-2"
            id="isAdmin"
          />
          <label htmlFor="isAdmin" className="font-medium">
            Register as Admin
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
      </>
  );
};

export default RegisterUser;