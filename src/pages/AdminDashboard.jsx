import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = ({adminDetails}) =>{
    const {username, email, role} = adminDetails || {};
    const navigate = useNavigate();

    const [plotDetails, setPlotDetails] = useState(null);
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revenueStats, setRevenueStats] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0
    });

    useEffect(()=>{
        const fetchPlotDetails = async ()=>{
            if (!email) return;
            
            try {
                const response = await axios.post('http://localhost:2025/api/parklots/getlots', {
                    email: email,
                });
                setPlotDetails(response.data.lots || []);
            } catch (error) {
                console.error("Error fetching parking lots:", error);
            }
        };

        const fetchAllBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:2025/api/bookings/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const bookings = response.data.bookings || [];
                setAllBookings(bookings);
                
                // Calculate revenue statistics
                const now = new Date();
                const today = now.toISOString().split('T')[0];
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

                const stats = bookings.reduce((acc, booking) => {
                    if (booking.paymentStatus === 'Completed') {
                        acc.total += booking.totalAmount;
                        
                        const bookingDate = new Date(booking.createdAt);
                        if (booking.bookingDate === today) {
                            acc.today += booking.totalAmount;
                        }
                        if (bookingDate >= weekAgo) {
                            acc.thisWeek += booking.totalAmount;
                        }
                        if (bookingDate >= monthAgo) {
                            acc.thisMonth += booking.totalAmount;
                        }
                    }
                    return acc;
                }, { today: 0, thisWeek: 0, thisMonth: 0, total: 0 });

                setRevenueStats(stats);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            }
        };

        fetchPlotDetails();
        fetchAllBookings();

        // Refresh data every 30 seconds
        const interval = setInterval(() => {
            fetchAllBookings();
            fetchPlotDetails();
        }, 30000);

        return () => clearInterval(interval);

    }, [email]);

    const totals = plotDetails?.reduce((acc, lot)=>{
        acc.availableSpots += lot.unreservedLots;
        acc.occupiedSpots += lot.reservedLots;
        acc.totalSpots += lot.unreservedLots + lot.reservedLots;
        return acc;
    },{availableSpots:0, occupiedSpots:0, totalSpots:0}) || {availableSpots:0, occupiedSpots:0, totalSpots:0};

    // Calculate booking statistics
    const activeBookings = allBookings.filter(b => b.bookingStatus === 'Active').length;
    const completedBookings = allBookings.filter(b => b.bookingStatus === 'Completed').length;
    const cancelledBookings = allBookings.filter(b => b.bookingStatus === 'Cancelled').length;
    const totalBookings = allBookings.length;

    // Calculate real-time available and occupied spots based on ACTIVE bookings
    const currentActiveBookings = allBookings.filter(b => b.bookingStatus === 'Active').length;
    const realTimeOccupied = currentActiveBookings;
    const realTimeAvailable = totals.totalSpots - realTimeOccupied;

    // Calculate today's bookings count
    const today = new Date().toISOString().split('T')[0];
    const todaysBookings = allBookings.filter(b => {
        const bookingDate = typeof b.bookingDate === 'string' 
            ? b.bookingDate 
            : new Date(b.bookingDate).toISOString().split('T')[0];
        return bookingDate === today;
    }).length;

    const todaysCompletedPayments = allBookings.filter(b => {
        const bookingDate = typeof b.bookingDate === 'string' 
            ? b.bookingDate 
            : new Date(b.bookingDate).toISOString().split('T')[0];
        return bookingDate === today && b.paymentStatus === 'Completed';
    }).length;

    // Get recent bookings (last 5)
    const recentBookings = allBookings.slice(0, 5);

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">{role} Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm text-slate-600">Welcome back,</p>
                            <p className="font-semibold text-slate-900">{username}</p>
                        </div>
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{username?.charAt(0)?.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Spots</h3>
                                <p className="text-3xl font-bold text-slate-900 mt-2">{totals.totalSpots}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">Available Now</h3>
                                <p className="text-3xl font-bold text-emerald-600 mt-2">
                                    {loading ? '...' : realTimeAvailable}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-slate-500">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <span>{currentActiveBookings} currently booked</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">Occupied Now</h3>
                                <p className="text-3xl font-bold text-red-600 mt-2">
                                    {loading ? '...' : realTimeOccupied}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-slate-500">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Active bookings</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">Revenue Today</h3>
                                <p className="text-3xl font-bold text-amber-600 mt-2">
                                    {loading ? '...' : `₹${revenueStats.today.toFixed(2)}`}
                                </p>
                                <div className="mt-2 flex items-center text-xs text-slate-500">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{todaysCompletedPayments} of {todaysBookings} bookings paid</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
                        <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">Total Bookings</h3>
                        <p className="text-3xl font-bold mt-2">{loading ? '...' : totalBookings}</p>
                        <p className="text-sm opacity-75 mt-1">All time</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-sm p-6 text-white">
                        <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">Active Bookings</h3>
                        <p className="text-3xl font-bold mt-2">{loading ? '...' : activeBookings}</p>
                        <p className="text-sm opacity-75 mt-1">Currently active</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                        <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">Completed</h3>
                        <p className="text-3xl font-bold mt-2">{loading ? '...' : completedBookings}</p>
                        <p className="text-sm opacity-75 mt-1">Successfully completed</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-sm p-6 text-white">
                        <h3 className="text-sm font-medium uppercase tracking-wide opacity-90">Total Revenue</h3>
                        <p className="text-3xl font-bold mt-2">{loading ? '...' : `₹${revenueStats.total.toFixed(0)}`}</p>
                        <p className="text-sm opacity-75 mt-1">All time earnings</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Your Parking Lots</h2>
                                <p className="text-sm text-slate-600 mt-1">Manage all parking locations</p>
                            </div>
                            <button 
                                onClick={() => navigate('/manage-parkinglots')}
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                            >
                                Manage Lots
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                {plotDetails && plotDetails.length > 0 ? (
                                    plotDetails.map((lot) => (
                                        <div key={lot._id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">{lot.parkingLotName}</h3>
                                                    <p className="text-sm text-slate-600">{lot.parkingLotLocation}</p>
                                                    <p className="text-xs text-slate-500 mt-1">₹{lot.rate}/hr</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-emerald-600">{realTimeAvailable}</p>
                                                    <p className="text-xs text-slate-600">Available</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-red-600">{realTimeOccupied}</p>
                                                    <p className="text-xs text-slate-600">Occupied</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{lot.unreservedLots + lot.reservedLots}</p>
                                                    <p className="text-xs text-slate-600">Total</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p>No parking lots added yet</p>
                                        <button 
                                            onClick={() => navigate('/manage-parking-lots')}
                                            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
                                        >
                                            Add Your First Lot
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
                            <p className="text-sm text-slate-600 mt-1">Latest parking transactions</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
                                        <p className="text-sm text-slate-600 mt-2">Loading...</p>
                                    </div>
                                ) : recentBookings.length > 0 ? (
                                    recentBookings.map((booking) => (
                                        <div key={booking._id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                booking.bookingStatus === 'Active' ? 'bg-emerald-500' :
                                                booking.bookingStatus === 'Completed' ? 'bg-blue-500' :
                                                'bg-red-500'
                                            }`}></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900">{booking.vehicleNumber} • {booking.vehicleType}</p>
                                                <p className="text-sm text-slate-600">{booking.parkingLotName}</p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {booking.bookingDate} • {booking.startTime} - {booking.endTime}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                        booking.bookingStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                        booking.bookingStatus === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {booking.bookingStatus}
                                                    </span>
                                                    <span className="text-sm font-semibold text-slate-900">₹{booking.totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        <p>No bookings yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Insights Section */}
                <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Revenue Insights
                        </h2>
                        <p className="text-amber-100 mt-1">Detailed earnings breakdown</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Today's Revenue */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-amber-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Today</h3>
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-amber-600 mb-1">₹{revenueStats.today.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">
                                    {allBookings.filter(b => b.bookingDate === new Date().toISOString().split('T')[0] && b.paymentStatus === 'Completed').length} completed bookings
                                </p>
                            </div>

                            {/* This Week's Revenue */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-amber-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">This Week</h3>
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-orange-600 mb-1">₹{revenueStats.thisWeek.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">Last 7 days</p>
                            </div>

                            {/* This Month's Revenue */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-amber-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">This Month</h3>
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-red-600 mb-1">₹{revenueStats.thisMonth.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">Last 30 days</p>
                            </div>
                        </div>

                        {/* Total Hours Booked */}
                        <div className="mt-6 bg-white rounded-lg p-5 shadow-sm border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">Total Hours Booked</h3>
                                    <p className="text-4xl font-bold text-slate-900">
                                        {allBookings.reduce((sum, b) => sum + b.duration, 0).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Across {allBookings.length} total bookings
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg p-4">
                                        <p className="text-xs uppercase tracking-wide mb-1">Average Duration</p>
                                        <p className="text-2xl font-bold">
                                            {allBookings.length > 0 
                                                ? (allBookings.reduce((sum, b) => sum + b.duration, 0) / allBookings.length).toFixed(2)
                                                : '0.00'
                                            }h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Bookings Table */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">All Bookings</h2>
                            <p className="text-sm text-slate-600 mt-1">Complete booking history with duration & revenue</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Total: {totalBookings}</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Vehicle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
                                            <p className="text-sm text-slate-600 mt-2">Loading bookings...</p>
                                        </td>
                                    </tr>
                                ) : allBookings.length > 0 ? (
                                    allBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">{booking.userName}</div>
                                                    <div className="text-xs text-slate-500">{booking.userEmail}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">{booking.vehicleNumber}</div>
                                                    <div className="text-xs text-slate-500">{booking.vehicleType}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-900">{booking.parkingLotName}</div>
                                                <div className="text-xs text-slate-500">{booking.parkingLotLocation}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900">{booking.bookingDate}</div>
                                                <div className="text-xs text-slate-500">{booking.startTime} - {booking.endTime}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {booking.duration}h
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                                ₹{booking.totalAmount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    booking.bookingStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                    booking.bookingStatus === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {booking.bookingStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                            <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <p>No bookings found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;