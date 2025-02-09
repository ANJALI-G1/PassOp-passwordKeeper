import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/passwords');
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-6 rounded shadow-md w-64">
                <h2 className="text-2xl mb-4 ">Welcome to <span>PassOp</span> App!</h2>
                {token ? (
                    <div>
                        <p className="mb-4">You can access your passwords in the Password section.</p>
                        <div className='flex justify-center'>
                            <button className='bg-purple-700 text-white p-2 rounded font-bold' onClick={handleClick}>Get passwords</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mb-4">Please <Link to="/login" className="text-blue-500">Login</Link> or <Link to="/signup" className="text-blue-500">Sign Up</Link> to access your passwords.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;