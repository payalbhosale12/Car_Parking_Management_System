import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:2025/api/bookings/my-bookings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setBookings(response.data.bookings || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setMessage(err.response?.data?.message || "Error fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:2025/api/bookings/cancel/${bookingId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);
            fetchBookings(); // Refresh the bookings list

            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error cancelling booking");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            case 'Refunded':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Sort bookings: Active first, then Completed, then Cancelled
    const sortedBookings = [...bookings].sort((a, b) => {
        const statusOrder = { 'Active': 1, 'Completed': 2, 'Cancelled': 3 };
        return (statusOrder[a.bookingStatus] || 4) - (statusOrder[b.bookingStatus] || 4);
    });

    // Group bookings by status
    const activeBookings = sortedBookings.filter(b => b.bookingStatus === 'Active');
    const completedBookings = sortedBookings.filter(b => b.bookingStatus === 'Completed');
    const cancelledBookings = sortedBookings.filter(b => b.bookingStatus === 'Cancelled');

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
                    <p className="text-gray-400">View and manage your parking reservations</p>
                    
                    {/* Summary Stats */}
                    {bookings.length > 0 && !loading && (
                        <div className="flex gap-4 mt-6">
                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
                                <span className="text-green-300 font-semibold">
                                    {activeBookings.length} Active
                                </span>
                            </div>
                            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-4 py-2">
                                <span className="text-blue-300 font-semibold">
                                    {completedBookings.length} Completed
                                </span>
                            </div>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2">
                                <span className="text-red-300 font-semibold">
                                    {cancelledBookings.length} Cancelled
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.includes('❌') || message.includes('Error')
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}>
                        {message}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg shadow-xl p-12 text-center border border-gray-700">
                        <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-2xl font-semibold text-white mb-2">No Bookings Found</h3>
                        <p className="text-gray-400 mb-6">You haven't made any parking reservations yet.</p>
                        <a
                            href="/bookings"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                        >
                            Book a Parking Spot
                        </a>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Active Bookings Section */}
                        {activeBookings.length > 0 && (
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
                                    <h2 className="text-2xl font-bold text-white">Active Reservations</h2>
                                    <span className="ml-3 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                                        {activeBookings.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {activeBookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border-2 border-green-500/50 hover:border-green-500 transition-all"
                                        >
                                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                                                <h3 className="text-xl font-bold text-white truncate">
                                                    {booking.parkingLotName}
                                                </h3>
                                                <p className="text-green-100 text-sm mt-1 truncate">
                                                    {booking.parkingLotLocation}
                                                </p>
                                            </div>

                                            <div className="p-6 space-y-4">
                                                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                                                        {booking.bookingStatus}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                        {booking.paymentStatus}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Vehicle:</span>
                                                        <span className="text-white font-semibold">{booking.vehicleNumber}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Type:</span>
                                                        <span className="text-white">{booking.vehicleType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Date:</span>
                                                        <span className="text-white">{formatDate(booking.bookingDate)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Time:</span>
                                                        <span className="text-white">{booking.startTime} - {booking.endTime}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Duration:</span>
                                                        <span className="text-white">
                                                            {booking.duration} hour{booking.duration !== 1 ? 's' : ''}
                                                            {booking.duration % 1 !== 0 ? ` (${Math.round(booking.duration * 60)} minutes)` : ''}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-gray-700">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-gray-400 font-medium">Total Amount Paid:</span>
                                                        <span className="text-green-400 font-bold text-xl">₹{booking.totalAmount.toFixed(2)}</span>
                                                    </div>

                                                    <button
                                                        onClick={() => handleCancelBooking(booking._id)}
                                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                </div>

                                                <div className="text-xs text-gray-500 text-center pt-2">
                                                    Booked on {new Date(booking.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed Bookings Section */}
                        {completedBookings.length > 0 && (
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
                                    <h2 className="text-2xl font-bold text-white">Completed Reservations</h2>
                                    <span className="ml-3 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                                        {completedBookings.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {completedBookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all opacity-90"
                                        >
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                                                <h3 className="text-xl font-bold text-white truncate">
                                                    {booking.parkingLotName}
                                                </h3>
                                                <p className="text-blue-100 text-sm mt-1 truncate">
                                                    {booking.parkingLotLocation}
                                                </p>
                                            </div>

                                            <div className="p-6 space-y-4">
                                                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                                                        {booking.bookingStatus}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                        {booking.paymentStatus}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Vehicle:</span>
                                                        <span className="text-white font-semibold">{booking.vehicleNumber}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Type:</span>
                                                        <span className="text-white">{booking.vehicleType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Date:</span>
                                                        <span className="text-white">{formatDate(booking.bookingDate)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Time:</span>
                                                        <span className="text-white">{booking.startTime} - {booking.endTime}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Duration:</span>
                                                        <span className="text-white">
                                                            {booking.duration} hour{booking.duration !== 1 ? 's' : ''}
                                                            {booking.duration % 1 !== 0 ? ` (${Math.round(booking.duration * 60)} minutes)` : ''}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-gray-700">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400 font-medium">Total Amount Paid:</span>
                                                        <span className="text-blue-400 font-bold text-xl">₹{booking.totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="text-xs text-gray-500 text-center pt-2">
                                                    Booked on {new Date(booking.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cancelled Bookings Section */}
                        {cancelledBookings.length > 0 && (
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
                                    <h2 className="text-2xl font-bold text-white">Cancelled Reservations</h2>
                                    <span className="ml-3 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                                        {cancelledBookings.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cancelledBookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all opacity-75"
                                        >
                                            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4">
                                                <h3 className="text-xl font-bold text-white truncate">
                                                    {booking.parkingLotName}
                                                </h3>
                                                <p className="text-gray-300 text-sm mt-1 truncate">
                                                    {booking.parkingLotLocation}
                                                </p>
                                            </div>

                                            <div className="p-6 space-y-4">
                                                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                                                        {booking.bookingStatus}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                        {booking.paymentStatus}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Vehicle:</span>
                                                        <span className="text-white font-semibold">{booking.vehicleNumber}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Type:</span>
                                                        <span className="text-white">{booking.vehicleType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Date:</span>
                                                        <span className="text-white">{formatDate(booking.bookingDate)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Time:</span>
                                                        <span className="text-white">{booking.startTime} - {booking.endTime}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Duration:</span>
                                                        <span className="text-white">
                                                            {booking.duration} hour{booking.duration !== 1 ? 's' : ''}
                                                            {booking.duration % 1 !== 0 ? ` (${Math.round(booking.duration * 60)} minutes)` : ''}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-gray-700">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-gray-400 font-medium">Amount:</span>
                                                        <span className="text-gray-400 font-bold text-xl">₹{booking.totalAmount.toFixed(2)}</span>
                                                    </div>
                                                    
                                                    <div className="text-center text-red-400 text-sm bg-red-500/10 py-2 rounded">
                                                        Booking was cancelled
                                                    </div>
                                                </div>

                                                <div className="text-xs text-gray-500 text-center pt-2">
                                                    Booked on {new Date(booking.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
