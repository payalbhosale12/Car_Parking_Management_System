import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({userDetails})=>{
    const {username, email, role} = userDetails || {};
    const navigate = useNavigate();

    const [bookingStats, setBookingStats] = useState(null);
    const [parkingLotStats, setParkingLotStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: username || '',
        email: email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (role === 'User') {
                    // Fetch user bookings
                    const response = await axios.get('http://localhost:2025/api/bookings/my-bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const bookings = response.data.bookings || [];
                    
                    setBookingStats({
                        total: bookings.length,
                        active: bookings.filter(b => b.bookingStatus === 'Active').length,
                        completed: bookings.filter(b => b.bookingStatus === 'Completed').length,
                        cancelled: bookings.filter(b => b.bookingStatus === 'Cancelled').length,
                        totalSpent: bookings
                            .filter(b => b.paymentStatus === 'Completed')
                            .reduce((sum, b) => sum + b.totalAmount, 0),
                        totalHours: bookings.reduce((sum, b) => sum + b.duration, 0)
                    });
                } else if (role === 'Admin') {
                    // Fetch admin parking lots and bookings
                    const [lotsResponse, bookingsResponse] = await Promise.all([
                        axios.post('http://localhost:2025/api/parklots/getlots', { email }),
                        axios.get('http://localhost:2025/api/bookings/all', {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    ]);

                    const lots = lotsResponse.data.lots || [];
                    const bookings = bookingsResponse.data.bookings || [];

                    setParkingLotStats({
                        totalLots: lots.length,
                        totalSpots: lots.reduce((sum, lot) => sum + lot.unreservedLots + lot.reservedLots, 0),
                        availableSpots: lots.reduce((sum, lot) => sum + lot.unreservedLots, 0),
                        totalBookings: bookings.length,
                        activeBookings: bookings.filter(b => b.bookingStatus === 'Active').length,
                        totalRevenue: bookings
                            .filter(b => b.paymentStatus === 'Completed')
                            .reduce((sum, b) => sum + b.totalAmount, 0)
                    });
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        if (username && email) {
            fetchStats();
        }
    }, [username, email, role]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        // Add your update profile logic here
        alert('Profile update feature - connect to your backend API');
        setEditMode(false);
    };

    const memberSince = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="relative">
                        <div className={`h-32 bg-gradient-to-r ${
                            role === 'Admin' 
                                ? 'from-purple-500 via-pink-500 to-red-500' 
                                : 'from-blue-500 via-cyan-500 to-teal-500'
                        }`}></div>
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-white to-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                                <span className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-20 pb-6 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{username}</h1>
                                <p className="text-slate-600 mt-1 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {email}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                        role === 'Admin' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {role}
                                    </span>
                                    <span className="text-sm text-slate-500">
                                        Member since {memberSince}
                                    </span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setEditMode(!editMode)}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'overview'
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Overview
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'settings'
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div>
                        {role === 'User' && bookingStats && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Total Bookings</p>
                                            <p className="text-3xl font-bold text-slate-900 mt-2">{bookingStats.total}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Active</p>
                                            <p className="text-3xl font-bold text-emerald-600 mt-2">{bookingStats.active}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Completed</p>
                                            <p className="text-3xl font-bold text-purple-600 mt-2">{bookingStats.completed}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Spent</p>
                                    <p className="text-4xl font-bold mt-2">₹{bookingStats.totalSpent.toFixed(2)}</p>
                                    <p className="text-sm opacity-75 mt-2">Across all bookings</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Hours</p>
                                    <p className="text-4xl font-bold mt-2">{bookingStats.totalHours.toFixed(1)}</p>
                                    <p className="text-sm opacity-75 mt-2">Hours parked</p>
                                </div>

                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Avg. Duration</p>
                                    <p className="text-4xl font-bold mt-2">
                                        {bookingStats.total > 0 
                                            ? (bookingStats.totalHours / bookingStats.total).toFixed(1)
                                            : '0'
                                        }h
                                    </p>
                                    <p className="text-sm opacity-75 mt-2">Per booking</p>
                                </div>
                            </div>
                        )}

                        {role === 'Admin' && parkingLotStats && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Parking Lots</p>
                                            <p className="text-3xl font-bold text-slate-900 mt-2">{parkingLotStats.totalLots}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Total Spots</p>
                                            <p className="text-3xl font-bold text-slate-900 mt-2">{parkingLotStats.totalSpots}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase tracking-wide font-semibold">Available</p>
                                            <p className="text-3xl font-bold text-emerald-600 mt-2">{parkingLotStats.availableSpots}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Bookings</p>
                                    <p className="text-4xl font-bold mt-2">{parkingLotStats.totalBookings}</p>
                                    <p className="text-sm opacity-75 mt-2">All time</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Active Bookings</p>
                                    <p className="text-4xl font-bold mt-2">{parkingLotStats.activeBookings}</p>
                                    <p className="text-sm opacity-75 mt-2">Currently active</p>
                                </div>

                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                                    <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Total Revenue</p>
                                    <p className="text-4xl font-bold mt-2">₹{parkingLotStats.totalRevenue.toFixed(0)}</p>
                                    <p className="text-sm opacity-75 mt-2">Lifetime earnings</p>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {role === 'User' ? (
                                    <>
                                        <button 
                                            onClick={() => navigate('/bookings')}
                                            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">New Booking</p>
                                                <p className="text-xs text-slate-600">Find parking spots</p>
                                            </div>
                                        </button>
                                        <button 
                                            onClick={() => navigate('/mybookings')}
                                            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">My Bookings</p>
                                                <p className="text-xs text-slate-600">View history</p>
                                            </div>
                                        </button>
                                        <button 
                                            onClick={() => navigate('/userdashboard')}
                                            className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">Dashboard</p>
                                                <p className="text-xs text-slate-600">View stats</p>
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => navigate('/manage-parking-lots')}
                                            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">Manage Lots</p>
                                                <p className="text-xs text-slate-600">Add/Edit parking</p>
                                            </div>
                                        </button>
                                        <button 
                                            onClick={() => navigate('/admindashboard')}
                                            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">Dashboard</p>
                                                <p className="text-xs text-slate-600">View analytics</p>
                                            </div>
                                        </button>
                                        <button className="flex items-center p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                                            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-slate-900">Revenue Report</p>
                                                <p className="text-xs text-slate-600">View earnings</p>
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
                        
                        {editMode ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div className="border-t border-slate-200 pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-slate-600">Username</p>
                                        <p className="text-lg font-semibold text-slate-900">{username}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-slate-600">Email</p>
                                        <p className="text-lg font-semibold text-slate-900">{email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-slate-600">Account Type</p>
                                        <p className="text-lg font-semibold text-slate-900">{role}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setEditMode(true)}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                >
                                    Edit Account Information
                                </button>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div className="mt-8 pt-8 border-t border-red-200">
                            <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-slate-700 mb-3">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>
        </div>
    );    
};

export default Profile;