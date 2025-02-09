import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            toast.success('Login successfully');
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                toast.error(error.response.data.msg || 'Error logging in');
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                toast.error('Error logging in. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <ToastContainer />
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-gray-400 text-black border rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-gray-400 text-black border rounded"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-purple-700 text-white font-bold py-2 rounded">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-black">
                    <p>Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;