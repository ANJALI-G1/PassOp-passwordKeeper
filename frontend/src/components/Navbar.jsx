// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     return (
//         <nav
//             className="bg-gray-900 flex items-center justify-between px-6 py-4 text-white sticky w-full top-0"
//             aria-label="Main Navigation"
//         >
//             {/* Logo */}
//             <div className="logo font-bold text-2xl md:text-xl">
//                 <span className="text-purple-600">&lt;</span>
//                 <span>Pass</span>
//                 <span className="text-purple-600">Op/&gt;</span>
//             </div>

//             <ul className="flex gap-6">
//                 <li>
//                     <NavLink
//                         to="/"
//                         className={({ isActive }) =>
//                             isActive ? 'text-purple-700 font-bold' : 'text-white'
//                         }
//                     >
//                         Home
//                     </NavLink>
//                 </li>

//                 {token ? (
//                     <>
//                         <li>
//                             <NavLink
//                                 to="/passwords"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-purple-700 font-bold' : 'text-white'
//                                 }
//                             >
//                                 Your Passwords
//                             </NavLink>
//                         </li>
//                         <li>
//                             <button onClick={handleLogout} className="text-white">
//                                 Logout
//                             </button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <NavLink
//                                 to="/login"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-yellow-500' : 'text-white'
//                                 }
//                             >
//                                 Login
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 to="/signup"
//                                 className={({ isActive }) =>
//                                     isActive ? 'text-yellow-500' : 'text-white'
//                                 }
//                             >
//                                 Sign Up
//                             </NavLink>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav
            className="bg-gray-900 flex items-center justify-between px-6 py-4 text-white sticky w-full top-0"
            aria-label="Main Navigation"
        >
            {/* Logo */}
            <div className="logo font-bold text-2xl md:text-xl">
                <span className="text-purple-600">&lt;</span>
                <span>Pass</span>
                <span className="text-purple-600">Op/&gt;</span>
            </div>

            <ul className="flex gap-6">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'text-purple-700 font-bold' : 'text-white'
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {token ? (
                    <>
                        <li>
                            <NavLink
                                to="/passwords"
                                className={({ isActive }) =>
                                    isActive ? 'text-purple-700 font-bold' : 'text-white'
                                }
                            >
                                <span className="hidden sm:inline">Your Passwords</span>
                                <span className="inline sm:hidden">Passwords</span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-white">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? 'text-yellow-500' : 'text-white'
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    isActive ? 'text-yellow-500' : 'text-white'
                                }
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;