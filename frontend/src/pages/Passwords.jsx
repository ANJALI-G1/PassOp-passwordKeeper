// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

// // const Passwords = () => {
// //     const [passwords, setPasswords] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [form, setForm] = useState({ sitename: '', username: '', password: '' });
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [editId, setEditId] = useState(null);
// //     const [showPasswords, setShowPasswords] = useState({});

// //     const API_URL = 'http://localhost:5000/api/passwords';

// //     useEffect(() => {
// //         const fetchPasswords = async () => {
// //             try {
// //                 const token = localStorage.getItem('token');
// //                 if (!token) {
// //                     toast.error('No token found, please login');
// //                     setLoading(false);
// //                     return;
// //                 }

// //                 const response = await axios.get(API_URL, {
// //                     headers: {
// //                         'x-auth-token': token
// //                     }
// //                 });

// //                 if (Array.isArray(response.data)) {
// //                     setPasswords(response.data.map(p => ({ ...p, visible: false })));
// //                 } else {
// //                     setPasswords([]);
// //                     toast.error('Invalid data format');
// //                 }

// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error('Error fetching passwords:', error);
// //                 toast.error(`Error fetching passwords: ${error.message}`);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchPasswords();
// //     }, []);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setForm({ ...form, [name]: value });
// //     };

// //     const handleAddPassword = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const token = localStorage.getItem('token');
// //             if (!token) {
// //                 toast.error('No token found, please login');
// //                 return;
// //             }

// //             const response = await axios.post(API_URL, form, {
// //                 headers: {
// //                     'x-auth-token': token,
// //                     'Content-Type': 'application/json'
// //                 }
// //             });
// //             setPasswords([...passwords, response.data]);
// //             setForm({ sitename: '', username: '', password: '' });
// //             toast.success('Password added successfully');
// //         } catch (error) {
// //             console.error('Error adding password:', error);
// //             toast.error(`Error adding password: ${error.response?.data?.message || error.message}`);
// //         }
// //     };

// //     const handleEditPassword = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const token = localStorage.getItem('token');
// //             if (!token) {
// //                 toast.error('No token found, please login');
// //                 return;
// //             }

// //             const response = await axios.put(`${API_URL}/${editId}`, form, {
// //                 headers: {
// //                     'x-auth-token': token,
// //                     'Content-Type': 'application/json'
// //                 }
// //             });
// //             setPasswords(passwords.map(p => (p._id === editId ? response.data : p)));
// //             setForm({ sitename: '', username: '', password: '' });
// //             setIsEditing(false);
// //             setEditId(null);
// //             toast.success('Password updated successfully');
// //         } catch (error) {
// //             console.error('Error updating password:', error);
// //             toast.error(`Error updating password: ${error.response?.data?.message || error.message}`);
// //         }
// //     };

// //     const handleDeletePassword = async (id) => {
// //         try {
// //             const token = localStorage.getItem('token');
// //             if (!token) {
// //                 toast.error('No token found, please login');
// //                 return;
// //             }

// //             await axios.delete(`${API_URL}/${id}`, {
// //                 headers: {
// //                     'x-auth-token': token
// //                 }
// //             });
// //             setPasswords(passwords.filter(p => p._id !== id));
// //             toast.success('Password deleted successfully');
// //         } catch (error) {
// //             console.error('Error deleting password:', error);
// //             toast.error(`Error deleting password: ${error.response?.data?.message || error.message}`);
// //         }
// //     };

// //     const startEdit = (password) => {
// //         setIsEditing(true);
// //         setEditId(password._id);
// //         setForm({ sitename: password.sitename, username: password.username, password: '' });
// //     };

// //     const toggleShowPassword = (id) => {
// //         setShowPasswords(prevShowPasswords => ({
// //             ...prevShowPasswords,
// //             [id]: !prevShowPasswords[id]
// //         }));
// //     };

// //     const copyToClipboard = (text) => {
// //         navigator.clipboard.writeText(text);
// //         toast.success('Copied to clipboard');
// //     };

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //             <ToastContainer />
// //             <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
// //                 <h2 className="text-2xl font-bold mb-6 text-center text-black">Your Passwords</h2>
                
// //                 <form onSubmit={isEditing ? handleEditPassword : handleAddPassword} className="mb-6">
// //                     <div className="mb-4">
// //                         <label className="block mb-2 font-bold" htmlFor="sitename">Site Name</label>
// //                         <input
// //                             type="text"
// //                             id="sitename"
// //                             name="sitename"
// //                             value={form.sitename}
// //                             onChange={handleInputChange}
// //                             className="w-full p-2 bg-gray-400 text-black border rounded"
// //                             placeholder="Enter site name"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="mb-4">
// //                         <label className="block mb-2 font-bold" htmlFor="username">Username</label>
// //                         <input
// //                             type="text"
// //                             id="username"
// //                             name="username"
// //                             value={form.username}
// //                             onChange={handleInputChange}
// //                             className="w-full p-2 bg-gray-400 text-black border rounded"
// //                             placeholder="Enter username"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="mb-4 relative">
// //                         <label className="block mb-2 font-bold" htmlFor="password">Password</label>
// //                         <input
// //                             type="password"
// //                             id="password"
// //                             name="password"
// //                             value={form.password}
// //                             onChange={handleInputChange}
// //                             className="w-full p-2 bg-gray-400 text-black border rounded"
// //                             placeholder="Enter password"
// //                             required
// //                         />
// //                     </div>
// //                     <button type="submit" className="w-full bg-purple-700 text-white font-bold py-2 rounded">
// //                         {isEditing ? 'Update Password' : 'Add Password'}
// //                     </button>
// //                 </form>

// //                 {passwords.length === 0 ? (
// //                     <p className="text-center text-black">No passwords found</p>
// //                 ) : (
// //                     <table className="min-w-full bg-white">
// //                         <thead>
// //                             <tr>
// //                                 <th className="py-2 px-4 border-b">Site Name</th>
// //                                 <th className="py-2 px-4 border-b">Username</th>
// //                                 <th className="py-2 px-4 border-b">Password</th>
// //                                 <th className="py-2 px-4 border-b">Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {passwords.map((password) => (
// //                                 <tr key={password._id}>
// //                                     <td className="py-2 px-4 border-b">{password.sitename}</td>
// //                                     <td className="py-2 px-4 border-b">
// //                                         {password.username}
// //                                         <button onClick={() => copyToClipboard(password.username)} className="ml-2">
// //                                             <FaCopy />
// //                                         </button>
// //                                     </td>
// //                                     <td className="py-2 px-4 border-b">
// //                                         {showPasswords[password._id] ? password.password : '••••••••'}
// //                                         <button onClick={() => toggleShowPassword(password._id)} className="ml-2">
// //                                             {showPasswords[password._id] ? <FaEyeSlash /> : <FaEye />}
// //                                         </button>
// //                                         <button onClick={() => copyToClipboard(password.password)} className="ml-2">
// //                                             <FaCopy />
// //                                         </button>
// //                                     </td>
// //                                     <td className="py-2 px-4 border-b">
// //                                         <button
// //                                             onClick={() => startEdit(password)}
// //                                             className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
// //                                         >
// //                                             Edit
// //                                         </button>
// //                                         <button
// //                                             onClick={() => handleDeletePassword(password._id)}
// //                                             className="bg-red-500 text-white px-2 py-1 rounded"
// //                                         >
// //                                             Delete
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Passwords;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

// const Passwords = () => {
//     const [passwords, setPasswords] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [form, setForm] = useState({ sitename: '', username: '', password: '' });
//     const [isEditing, setIsEditing] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [showPasswords, setShowPasswords] = useState({});

//     const API_URL = 'http://localhost:5000/api/passwords';

//     useEffect(() => {
//         const fetchPasswords = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     toast.error('No token found, please login');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await axios.get(API_URL, {
//                     headers: {
//                         'x-auth-token': token
//                     }
//                 });

//                 if (Array.isArray(response.data)) {
//                     setPasswords(response.data.map(p => ({ ...p, visible: false })));
//                 } else {
//                     setPasswords([]);
//                     toast.error('Invalid data format');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching passwords:', error);
//                 toast.error(`Error fetching passwords: ${error.message}`);
//                 setLoading(false);
//             }
//         };

//         fetchPasswords();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleAddPassword = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('No token found, please login');
//                 return;
//             }

//             const response = await axios.post(API_URL, form, {
//                 headers: {
//                     'x-auth-token': token,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             // Decrypt the newly added password
//             const newPassword = { ...response.data, password: form.password, visible: false };
//             setPasswords([...passwords, newPassword]);
//             setForm({ sitename: '', username: '', password: '' });
//             toast.success('Password added successfully');
//         } catch (error) {
//             console.error('Error adding password:', error);
//             toast.error(`Error adding password: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     const handleEditPassword = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('No token found, please login');
//                 return;
//             }

//             const response = await axios.put(`${API_URL}/${editId}`, form, {
//                 headers: {
//                     'x-auth-token': token,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             // Decrypt the updated password
//             const updatedPassword = { ...response.data, password: form.password, visible: false };
//             setPasswords(passwords.map(p => (p._id === editId ? updatedPassword : p)));
//             setForm({ sitename: '', username: '', password: '' });
//             setIsEditing(false);
//             setEditId(null);
//             toast.success('Password updated successfully');
//         } catch (error) {
//             console.error('Error updating password:', error);
//             toast.error(`Error updating password: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     const handleDeletePassword = async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('No token found, please login');
//                 return;
//             }

//             await axios.delete(`${API_URL}/${id}`, {
//                 headers: {
//                     'x-auth-token': token
//                 }
//             });
//             setPasswords(passwords.filter(p => p._id !== id));
//             toast.success('Password deleted successfully');
//         } catch (error) {
//             console.error('Error deleting password:', error);
//             toast.error(`Error deleting password: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     const startEdit = (password) => {
//         setIsEditing(true);
//         setEditId(password._id);
//         setForm({ sitename: password.sitename, username: password.username, password: '' });
//     };

//     const toggleShowPassword = (id) => {
//         setShowPasswords(prevShowPasswords => ({
//             ...prevShowPasswords,
//             [id]: !prevShowPasswords[id]
//         }));
//     };

//     const copyToClipboard = (text) => {
//         navigator.clipboard.writeText(text);
//         toast.success('Copied to clipboard');
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <ToastContainer />
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
//                 <h2 className="text-2xl font-bold mb-6 text-center text-black">Your Passwords</h2>
                
//                 <form onSubmit={isEditing ? handleEditPassword : handleAddPassword} className="mb-6">
//                     <div className="mb-4">
//                         <label className="block mb-2 font-bold" htmlFor="sitename">Site Name</label>
//                         <input
//                             type="text"
//                             id="sitename"
//                             name="sitename"
//                             value={form.sitename}
//                             onChange={handleInputChange}
//                             className="w-full p-2 bg-gray-400 text-black border rounded"
//                             placeholder="Enter site name"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-2 font-bold" htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             value={form.username}
//                             onChange={handleInputChange}
//                             className="w-full p-2 bg-gray-400 text-black border rounded"
//                             placeholder="Enter username"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4 relative">
//                         <label className="block mb-2 font-bold" htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={form.password}
//                             onChange={handleInputChange}
//                             className="w-full p-2 bg-gray-400 text-black border rounded"
//                             placeholder="Enter password"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-purple-700 text-white font-bold py-2 rounded">
//                         {isEditing ? 'Update Password' : 'Add Password'}
//                     </button>
//                 </form>

//                 {passwords.length === 0 ? (
//                     <p className="text-center text-black">No passwords found</p>
//                 ) : (
//                     <table className="min-w-full bg-white">
//                         <thead>
//                             <tr>
//                                 <th className="py-2 px-4 border-b">Site Name</th>
//                                 <th className="py-2 px-4 border-b">Username</th>
//                                 <th className="py-2 px-4 border-b">Password</th>
//                                 <th className="py-2 px-4 border-b">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {passwords.map((password) => (
//                                 <tr key={password._id}>
//                                     <td className="py-2 px-4 border-b">{password.sitename}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         {password.username}
//                                         <button onClick={() => copyToClipboard(password.username)} className="ml-2">
//                                             <FaCopy />
//                                         </button>
//                                     </td>
//                                     <td className="py-2 px-4 border-b">
//                                         {showPasswords[password._id] ? password.password : '••••••••'}
//                                         <button onClick={() => toggleShowPassword(password._id)} className="ml-2">
//                                             {showPasswords[password._id] ? <FaEyeSlash /> : <FaEye />}
//                                         </button>
//                                         <button onClick={() => copyToClipboard(password.password)} className="ml-2">
//                                             <FaCopy />
//                                         </button>
//                                     </td>
//                                     <td className="py-2 px-4 border-b">
//                                         <button
//                                             onClick={() => startEdit(password)}
//                                             className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDeletePassword(password._id)}
//                                             className="bg-red-500 text-white px-2 py-1 rounded"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Passwords;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ sitename: '', username: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});

    const API_URL = 'http://localhost:5000/api/passwords';

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('No token found, please login');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: {
                        'x-auth-token': token
                    }
                });

                if (Array.isArray(response.data)) {
                    setPasswords(response.data.map(p => ({ ...p, visible: false })));
                } else {
                    setPasswords([]);
                    toast.error('Invalid data format');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching passwords:', error);
                toast.error(`Error fetching passwords: ${error.message}`);
                setLoading(false);
            }
        };

        fetchPasswords();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddPassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found, please login');
                return;
            }

            const response = await axios.post(API_URL, form, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Decrypt the newly added password
            const newPassword = { ...response.data, password: form.password, visible: false };
            setPasswords([...passwords, newPassword]);
            setForm({ sitename: '', username: '', password: '' });
            toast.success('Password added successfully');
        } catch (error) {
            console.error('Error adding password:', error);
            toast.error(`Error adding password: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEditPassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found, please login');
                return;
            }

            const response = await axios.put(`${API_URL}/${editId}`, form, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Decrypt the updated password
            const updatedPassword = { ...response.data, password: form.password, visible: false };
            setPasswords(passwords.map(p => (p._id === editId ? updatedPassword : p)));
            setForm({ sitename: '', username: '', password: '' });
            setIsEditing(false);
            setEditId(null);
            toast.success('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error(`Error updating password: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeletePassword = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found, please login');
                return;
            }

            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setPasswords(passwords.filter(p => p._id !== id));
            toast.success('Password deleted successfully');
        } catch (error) {
            console.error('Error deleting password:', error);
            toast.error(`Error deleting password: ${error.response?.data?.message || error.message}`);
        }
    };

    const startEdit = (password) => {
        setIsEditing(true);
        setEditId(password._id);
        setForm({ sitename: password.sitename, username: password.username, password: '' });
    };

    const toggleShowPassword = (id) => {
        setShowPasswords(prevShowPasswords => ({
            ...prevShowPasswords,
            [id]: !prevShowPasswords[id]
        }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <ToastContainer />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Your Passwords</h2>
                
                <form onSubmit={isEditing ? handleEditPassword : handleAddPassword} className="mb-6">
                    <div className="mb-4">
                        <label className="block mb-2 font-bold" htmlFor="sitename">Site Name</label>
                        <input
                            type="text"
                            id="sitename"
                            name="sitename"
                            value={form.sitename}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-200 text-black border rounded"
                            placeholder="Enter site name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-200 text-black border rounded"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block mb-2 font-bold" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-200 text-black border rounded"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-purple-700 text-white font-bold py-2 rounded transition duration-200 hover:bg-purple-800">
                        {isEditing ? 'Update Password' : 'Add Password'}
                    </button>
                </form>

                {passwords.length === 0 ? (
                    <p className="text-center text-black">No passwords found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Site Name</th>
                                    <th className="py-2 px-4 border-b">Username</th>
                                    <th className="py-2 px-4 border-b">Password</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((password) => (
                                    <tr key={password._id}>
                                        <td className="py-2 px-4 border-b">{password.sitename}</td>
                                        <td className="py-2 px-4 border-b">
                                            {password.username}
                                            <button onClick={() => copyToClipboard(password.username)} className="ml-2">
                                                <FaCopy />
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {showPasswords[password._id] ? password.password : '••••••••'}
                                            <button onClick={() => toggleShowPassword(password._id)} className="ml-2">
                                                {showPasswords[password._id] ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            <button onClick={() => copyToClipboard(password.password)} className="ml-2">
                                                <FaCopy />
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 border-b flex space-x-2">
                                            <button
                                                onClick={() => startEdit(password)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePassword(password._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Passwords;