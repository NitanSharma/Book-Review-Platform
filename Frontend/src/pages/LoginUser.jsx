import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const LoginUser = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);
  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        //  console.log('Login successful:', response.data);
        // Handle successful login (e.g., redirect or store token)
        // For example, you can redirect to the home page:
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
      setEmail("");
      setPassword("");
      setSuccess("Registration successful!");
      // Handle successful login (e.g., redirect or store token)
    } catch (error) {
      console.error("Error during login:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      // Handle error (e.g., show error message)
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-600 bg-green-100 p-2 rounded">
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
           disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
         {loading ? "Login..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
