import express from 'express';
import Booking from '../models/Bookings.js';
import AdminParkingLots from '../models/AdminParkingLots.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { updateBookingStatuses, synchronizeDatabase, getRealTimeAvailability } from '../utils/bookingScheduler.js';

const router = express.Router();

// API: Create a new booking
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { 
            parkingLotId, 
            vehicleNumber, 
            vehicleType, 
            bookingDate, 
            startTime, 
            endTime, 
            duration 
        } = req.body;

        const { username, email } = req.user;

        // Validate required fields
        if (!parkingLotId || !vehicleNumber || !vehicleType || !bookingDate || !startTime || !endTime || !duration) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find the parking lot
        const parkingLot = await AdminParkingLots.findById(parkingLotId);
        if (!parkingLot) {
            return res.status(404).json({ message: "❌Parking lot not found" });
        }

        // Check for conflicting bookings in the same time slot
        const requestedDate = new Date(bookingDate).toISOString().split('T')[0];
        const conflictingBookings = await Booking.countDocuments({
            parkingLotId: parkingLotId,
            bookingStatus: 'Active',
            bookingDate: new Date(requestedDate),
            $or: [
                // New booking starts during an existing booking
                {
                    startTime: { $lte: startTime },
                    endTime: { $gt: startTime }
                },
                // New booking ends during an existing booking
                {
                    startTime: { $lt: endTime },
                    endTime: { $gte: endTime }
                },
                // New booking completely contains an existing booking
                {
                    startTime: { $gte: startTime },
                    endTime: { $lte: endTime }
                }
            ]
        });

        // Calculate real available spots considering time conflicts
        const totalSpots = parkingLot.unreservedLots + parkingLot.reservedLots;
        const availableForTimeSlot = totalSpots - conflictingBookings;

        if (availableForTimeSlot <= 0) {
            return res.status(400).json({ 
                message: "❌No parking spots available for the selected time slot",
                conflictingBookings,
                totalSpots 
            });
        }

        // Calculate total amount
        const totalAmount = duration * parkingLot.rate;

        // Create new booking
        const newBooking = new Booking({
            userEmail: email,
            userName: username,
            parkingLotId: parkingLot._id,
            parkingLotName: parkingLot.parkingLotName,
            parkingLotLocation: parkingLot.parkingLotLocation,
            parkingLotAddress: parkingLot.parkingLotAddress,
            vehicleNumber,
            vehicleType,
            bookingDate,
            startTime,
            endTime,
            duration,
            rate: parkingLot.rate,
            totalAmount,
            paymentStatus: 'Completed', // Auto-complete for now
        });

        await newBooking.save();

        // Update parking lot availability (will be synced by scheduler)
        parkingLot.unreservedLots = Math.max(0, parkingLot.unreservedLots - 1);
        parkingLot.reservedLots += 1;
        await parkingLot.save();

        res.status(200).json({
            message: "✅Booking created successfully",
            booking: newBooking,
            availableSpots: availableForTimeSlot - 1
        });

    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ error: "Error creating booking", details: err.message });
    }
});

// API: Get all bookings for a user
router.get('/my-bookings', authMiddleware, async (req, res) => {
    try {
        const { email } = req.user;

        const bookings = await Booking.find({ userEmail: email }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "✅Bookings retrieved successfully",
            bookings,
        });

    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "Error fetching bookings" });
    }
});

// API: Get all bookings (Admin only)
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const { role } = req.user;

        if (role !== 'Admin') {
            return res.status(403).json({ message: "❌Access denied. Admin only." });
        }

        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "✅All bookings retrieved successfully",
            bookings,
        });

    } catch (err) {
        console.error("Error fetching all bookings:", err);
        res.status(500).json({ error: "Error fetching bookings" });
    }
});

// API: Cancel a booking
router.put('/cancel/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.user;

        const booking = await Booking.findById(id);
        
        if (!booking) {
            return res.status(404).json({ message: "❌Booking not found" });
        }

        // Check if user owns this booking
        if (booking.userEmail !== email) {
            return res.status(403).json({ message: "❌Unauthorized to cancel this booking" });
        }

        if (booking.bookingStatus === 'Cancelled') {
            return res.status(400).json({ message: "❌Booking is already cancelled" });
        }

        // Update booking status
        booking.bookingStatus = 'Cancelled';
        booking.paymentStatus = 'Refunded';
        await booking.save();

        // Update parking lot availability
        const parkingLot = await AdminParkingLots.findById(booking.parkingLotId);
        if (parkingLot) {
            parkingLot.unreservedLots += 1;
            parkingLot.reservedLots -= 1;
            await parkingLot.save();
        }

        res.status(200).json({
            message: "✅Booking cancelled successfully",
            booking,
        });

    } catch (err) {
        console.error("Error cancelling booking:", err);
        res.status(500).json({ error: "Error cancelling booking" });
    }
});

// API: Get booking by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "❌Booking not found" });
        }

        res.status(200).json({
            message: "✅Booking retrieved successfully",
            booking,
        });

    } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ error: "Error fetching booking" });
    }
});

// API: Sync database (update booking statuses based on time)
router.post('/sync', async (req, res) => {
    try {
        await updateBookingStatuses();
        await synchronizeDatabase();
        
        res.status(200).json({
            message: "✅Database synchronized successfully",
        });
    } catch (err) {
        console.error("Error syncing database:", err);
        res.status(500).json({ error: "Error syncing database" });
    }
});

// API: Get real-time availability for a parking lot
router.get('/availability/:parkingLotId', async (req, res) => {
    try {
        const { parkingLotId } = req.params;
        
        const availability = await getRealTimeAvailability(parkingLotId);
        
        if (!availability) {
            return res.status(404).json({ message: "❌Parking lot not found" });
        }
        
        res.status(200).json({
            message: "✅Real-time availability retrieved",
            availability,
        });
    } catch (err) {
        console.error("Error getting real-time availability:", err);
        res.status(500).json({ error: "Error getting availability" });
    }
});

export default router;
