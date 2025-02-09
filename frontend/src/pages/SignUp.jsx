import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);

            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                if (error.response.data.msg) {
                    setError(error.response.data.msg);
                } else {
                    setError('Registration failed. Please try again.');
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex  bg-black items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-64">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Sign Up</button>
                </form>
                <div className="mt-4 text-center">
                    <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;