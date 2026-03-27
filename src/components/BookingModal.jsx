import { useState } from "react";
import axios from "axios";

const BookingModal = ({ plot, onClose, onBookingSuccess }) => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("Car");
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState(1);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const calculateDuration = (start, end) => {
        if (start && end) {
            // Parse hours and minutes
            const [startHour, startMin] = start.split(':').map(Number);
            const [endHour, endMin] = end.split(':').map(Number);
            
            // Convert to total minutes
            const startTotalMinutes = startHour * 60 + startMin;
            const endTotalMinutes = endHour * 60 + endMin;
            
            // Calculate difference in minutes
            const diffMinutes = endTotalMinutes - startTotalMinutes;
            
            if (diffMinutes > 0) {
                // Convert to hours (rounded to 2 decimal places)
                const hours = Math.round((diffMinutes / 60) * 100) / 100;
                setDuration(hours);
                return hours;
            }
        }
        setDuration(0);
        return 0;
    };

    const handleStartTimeChange = (e) => {
        const start = e.target.value;
        setStartTime(start);
        calculateDuration(start, endTime);
    };

    const handleEndTimeChange = (e) => {
        const end = e.target.value;
        setEndTime(end);
        calculateDuration(startTime, end);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (duration <= 0) {
            setMessage("End time must be after start time");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage("Please login to book a parking spot");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                'http://localhost:2025/api/bookings/create',
                {
                    parkingLotId: plot._id,
                    vehicleNumber: vehicleNumber.toUpperCase(),
                    vehicleType,
                    bookingDate,
                    startTime,
                    endTime,
                    duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);
            setTimeout(() => {
                onBookingSuccess();
                onClose();
            }, 2000);

        } catch (err) {
            setMessage(err.response?.data?.message || err.response?.data?.error || "Error creating booking");
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = duration * plot.rate;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Book Parking Spot</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-blue-100 mt-2">{plot.parkingLotName} - {plot.parkingLotLocation}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm ${
                            message.includes('❌') || message.includes('Error') 
                                ? 'bg-red-50 text-red-800 border border-red-200' 
                                : 'bg-green-50 text-green-800 border border-green-200'
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600 font-medium">Available Spots:</span>
                            <span className="text-green-600 font-bold text-lg">{plot.unreservedLots}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Rate per Hour:</span>
                            <span className="text-blue-600 font-bold text-lg">₹{plot.rate}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Vehicle Number *
                        </label>
                        <input
                            type="text"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                            placeholder="Enter vehicle number (e.g., ABC-1234)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Vehicle Type *
                        </label>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="SUV">SUV</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Booking Date *
                        </label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={handleStartTimeChange}
                                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                End Time *
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 font-medium">Duration:</span>
                            <span className="text-blue-700 font-bold">
                                {duration > 0 ? `${duration} hour${duration !== 1 ? 's' : ''}` : 'Select times'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 font-medium">Rate per Hour:</span>
                            <span className="text-blue-700 font-bold">₹{plot.rate}</span>
                        </div>
                        <div className="h-px bg-blue-200 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold text-lg">Total Amount to Pay:</span>
                            <span className="text-blue-700 font-bold text-2xl">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || plot.unreservedLots <= 0}
                            className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                                loading || plot.unreservedLots <= 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                            }`}
                        >
                            {loading ? 'Processing...' : plot.unreservedLots <= 0 ? 'No Spots Available' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
