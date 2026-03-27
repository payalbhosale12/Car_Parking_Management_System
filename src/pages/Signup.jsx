import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [selectedRole, setSelectedRole] = useState("");
    const handleChange = (e) => setSelectedRole(e.target.value);

    const navigate = useNavigate();

    const handleSignUp = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:2025/api/auth/register',{
                username: username,
                email: email,
                role: selectedRole,
                password: password,
            });

            setMessage(response.data.message);

            setTimeout(()=>{
                // window.location.reload();
                navigate('/login');
            }, 2000);

        } catch(err){
            setMessage(err.response?.data?.message ||"ERROR SIGNING UP!");
        }
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-12 w-12 bg-white rounded-xl flex items-center justify-center mb-4">
                            <svg className="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">Sign up to get started with our platform</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignUp}>
                        {message && (
                            <div className={`p-3 rounded-lg text-sm font-medium text-center ${
                                message.includes('ERROR') || message.includes('error') 
                                    ? 'bg-red-900/50 text-red-300 border border-red-700' 
                                    : 'bg-green-900/50 text-green-300 border border-green-700'
                            }`}>
                                {message}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-white placeholder-gray-400"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required 
                                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-white placeholder-gray-400"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Account Type
                                </label>
                                <select
                                    value={selectedRole}
                                    onChange={handleChange}
                                    name="role"
                                    id="role"
                                    required
                                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-white"
                                >   
                                    <option value="">Select account type</option>
                                    <option value="Admin">Parking Lot Administrator</option>
                                    <option value="User">Standard User</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required 
                                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-white placeholder-gray-400"
                                    placeholder="Create a secure password"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <a 
                                href="/login" 
                                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;