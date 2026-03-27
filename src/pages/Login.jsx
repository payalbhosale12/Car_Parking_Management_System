import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () =>{
    const [selectedRole, setSelectedRole] = useState("");
    const handleChange = (e) => setSelectedRole(e.target.value);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:2025/api/auth/login',{
                email: email,
                role: selectedRole,
                password: password,
            });

            localStorage.setItem("token", response.data.token);

            setMessage(response.data.message);

            setTimeout(()=>{
                window.location.reload();
                navigate('/');
            }, 2000);


        } catch(err){
            setMessage(err.response?.data?.message ||"ERROR LOGGING IN!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Sign In
                        </h1>
                        <p className="text-gray-300 text-sm">Access your parking management account</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {message && (
                            <div className={`text-center p-4 rounded-lg text-sm ${message.includes('ERROR') || message.includes('error') 
                                ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
                                : 'bg-green-500/20 border border-green-500/30 text-green-300'
                            }`}>
                                {message}
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required 
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Role Input */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-200 mb-2">
                                    Access Role
                                </label>
                                <select
                                    value={selectedRole}
                                    onChange={handleChange}
                                    name="role"
                                    id="role"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >   
                                    <option value="" className="bg-gray-800 text-gray-300">Select your role</option>
                                    <option value="Admin" className="bg-gray-800 text-gray-300">Parking Lot Administrator</option>
                                    <option value="User" className="bg-gray-800 text-gray-300">Standard User</option>
                                </select>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required 
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>        
                        </div>

                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Sign In to System
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-gray-400 text-sm">
                            New to the system?{' '}
                            <a 
                                href="/signup" 
                                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                Create an account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;