import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    parkingLotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminParkingLots',
        required: true,
    },
    parkingLotName: {
        type: String,
        required: true,
    },
    parkingLotLocation: {
        type: String,
        required: true,
    },
    parkingLotAddress: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'Bike', 'SUV', 'Truck'],
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // in hours
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending',
    },
    bookingStatus: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default: 'Active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Booking", BookingSchema, "Bookings");
