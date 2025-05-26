import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData ={
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:3000/users/login',userData ,{withCredentials: true});
               
            if (response.status === 201) {   
                //  console.log('Login successful:', response.data);
                // Handle successful login (e.g., redirect or store token)
                // For example, you can redirect to the home page:
                navigate('/');
            }
            setEmail('');
            setPassword('');
            // Handle successful login (e.g., redirect or store token)
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error (e.g., show error message)
        }
    }

  return (
    <div>
        <form
            className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginUser