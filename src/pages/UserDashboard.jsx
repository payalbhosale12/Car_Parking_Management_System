import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardUser = ({userDetails}) =>{
    const {username, email} = userDetails || {};
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        completed: 0,
        cancelled: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
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

                const bookingsData = response.data.bookings || [];
                setBookings(bookingsData);

                // Calculate statistics
                const statsData = {
                    total: bookingsData.length,
                    active: bookingsData.filter(b => b.bookingStatus === 'Active').length,
                    completed: bookingsData.filter(b => b.bookingStatus === 'Completed').length,
                    cancelled: bookingsData.filter(b => b.bookingStatus === 'Cancelled').length,
                };
                setStats(statsData);

            } catch (err) {
                console.error("Error fetching bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchBookings();
        }
    }, [email, navigate]);

    const activeBookings = bookings.filter(b => b.bookingStatus === 'Active').slice(0, 2);
    const pastBookings = bookings.filter(b => b.bookingStatus === 'Completed' || b.bookingStatus === 'Cancelled').slice(0, 2);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Completed':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const totalSpent = bookings
        .filter(b => b.paymentStatus === 'Completed')
        .reduce((sum, b) => sum + b.totalAmount, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome, {username}</h1>
            <p className="text-slate-600 text-lg mt-2">Manage your parking reservations efficiently</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{loading ? '...' : stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Active</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{loading ? '...' : stats.active}</p>
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
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Completed</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{loading ? '...' : stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Spent</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">₹{loading ? '...' : totalSpent.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-6">
                  <a href="/bookings" className="bg-slate-900 text-white px-6 py-4 rounded-lg hover:bg-slate-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md text-center">
                    Book Parking
                  </a>
                  <a href="/mybookings" className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md text-center">
                    View All Bookings
                  </a>
                </div>
              </div>

              {/* Active Bookings */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900">Active Bookings</h2>
                  <span className="text-sm text-slate-500">{stats.active} active</span>
                </div>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : activeBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-slate-500 mb-4">No active bookings</p>
                    <a href="/bookings" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking._id} className="flex justify-between items-center p-5 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-900">{booking.parkingLotName}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{booking.parkingLotLocation}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(booking.bookingDate)} • {booking.startTime} - {booking.endTime}
                          </p>
                          <p className="text-sm text-slate-500">Vehicle: {booking.vehicleNumber} ({booking.vehicleType})</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">₹{booking.totalAmount.toFixed(2)}</p>
                          <p className="text-xs text-slate-500">{booking.duration}h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Bookings */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900">Recent History</h2>
                  <a href="/mybookings" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All →
                  </a>
                </div>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : pastBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-500">No booking history yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking._id} className="flex justify-between items-center p-5 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors opacity-75">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-900">{booking.parkingLotName}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{booking.parkingLotLocation}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(booking.bookingDate)} • {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-600">₹{booking.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Profile</h2>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-semibold text-2xl">{username?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <p className="font-semibold text-slate-900 text-lg">{username}</p>
                  <p className="text-slate-500 mt-1 text-sm">{email}</p>
                  <a href="/profile" className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Edit Profile →
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Parking Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">This Month</span>
                    <span className="font-bold text-2xl">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Avg. Duration</span>
                    <span className="font-bold text-2xl">
                      {bookings.length > 0 
                        ? Math.round(bookings.reduce((sum, b) => sum + b.duration, 0) / bookings.length) 
                        : 0}h
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Total Saved</span>
                    <span className="font-bold text-2xl">₹{totalSpent.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Need Help?</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Have questions about your bookings or need assistance?
                </p>
                <a href="/contactus" className="block w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-all duration-200 font-medium border border-slate-200 text-center">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DashboardUser;