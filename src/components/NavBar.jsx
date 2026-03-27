import axios from 'axios';
import { useState } from 'react';

const NavBar = ({ userDetails }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {username, email,role, message} = userDetails || {};

    return (
        <div className="bg-slate-900 border-b border-slate-700 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-xl font-bold text-white">
                        <a href="/" className="hover:text-slate-300 transition duration-200 flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                </svg>
                            </div>
                            Smart Parking System
                        </a>
                    </h1>
                    <nav>
                        <ul className="flex space-x-1">
                            <li>
                                <a href="/" className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contactus" className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/pricing" className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                {userDetails && username ? (
                                    <div className="relative">
                                        <button 
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center border border-slate-700"
                                        >
                                            <div className="w-6 h-6 bg-blue-600 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-white">
                                                {username.charAt(0).toUpperCase()}
                                            </div>
                                            {username}
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                                                <div className="px-4 py-2 border-b border-slate-200">
                                                    <p className="text-sm font-medium text-slate-900">{username}</p>
                                                    <p className="text-xs text-slate-500">{email}</p>
                                                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{role}</span>
                                                </div>
                                                <a href="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition duration-150">
                                                    <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </a>
                                                <a href={role==='User' ? '/userdashboard' : '/admindashboard'} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition duration-150">
                                                    <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    Dashboard
                                                </a>
                                                {role === 'User' && (
                                                    <a href="/mybookings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition duration-150">
                                                        <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        My Bookings
                                                    </a>
                                                )}
                                                {role === 'Admin' &&(
                                                    <a href="/manage-parkinglots" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition duration-150">
                                                        <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        Manage Parking Lots
                                                    </a>
                                                )}
                                                <hr className="my-2 border-slate-200" />
                                                <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150">
                                                    <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Logout
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 border border-blue-600">
                                        Sign In
                                    </a>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NavBar;