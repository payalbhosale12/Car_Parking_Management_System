import Booking from '../models/Bookings.js';
import AdminParkingLots from '../models/AdminParkingLots.js';

/**
 * Check and update booking statuses based on current time
 * This function should be called periodically (e.g., every minute)
 */
export const updateBookingStatuses = async () => {
    try {
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

        // Find all active bookings
        const activeBookings = await Booking.find({ bookingStatus: 'Active' });

        for (const booking of activeBookings) {
            const bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
            
            // Check if booking has ended (date is past OR date is today and time has passed)
            const isPastDate = bookingDate < currentDate;
            const isToday = bookingDate === currentDate;
            const isPastTime = isToday && booking.endTime <= currentTime;

            if (isPastDate || isPastTime) {
                // Mark booking as completed
                booking.bookingStatus = 'Completed';
                await booking.save();

                // Free up the parking spot
                const parkingLot = await AdminParkingLots.findById(booking.parkingLotId);
                if (parkingLot) {
                    parkingLot.unreservedLots += 1;
                    parkingLot.reservedLots = Math.max(0, parkingLot.reservedLots - 1);
                    await parkingLot.save();
                    console.log(`✅ Freed spot for booking ${booking._id} at ${parkingLot.parkingLotName}`);
                }
            }
        }

        return { success: true, message: 'Booking statuses updated' };
    } catch (error) {
        console.error('Error updating booking statuses:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Check if a booking should be active now based on timestamps
 */
export const shouldBookingBeActive = (booking) => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
    
    const bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
    const isToday = bookingDate === currentDate;
    const isWithinTimeRange = isToday && currentTime >= booking.startTime && currentTime <= booking.endTime;
    
    return isWithinTimeRange;
};

/**
 * Get real-time parking lot availability considering time-based bookings
 */
export const getRealTimeAvailability = async (parkingLotId) => {
    try {
        const parkingLot = await AdminParkingLots.findById(parkingLotId);
        if (!parkingLot) {
            return null;
        }

        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

        // Find active bookings that are currently in their time window
        const activeBookingsNow = await Booking.countDocuments({
            parkingLotId: parkingLotId,
            bookingStatus: 'Active',
            bookingDate: new Date(currentDate),
            startTime: { $lte: currentTime },
            endTime: { $gte: currentTime }
        });

        // Calculate available spots
        const totalSpots = parkingLot.unreservedLots + parkingLot.reservedLots;
        const availableSpots = totalSpots - activeBookingsNow;
        const occupiedSpots = activeBookingsNow;

        return {
            totalSpots,
            availableSpots: Math.max(0, availableSpots),
            occupiedSpots,
            parkingLotName: parkingLot.parkingLotName
        };
    } catch (error) {
        console.error('Error calculating real-time availability:', error);
        return null;
    }
};

/**
 * Synchronize database with actual booking status
 * This ensures the database accurately reflects current occupancy
 */
export const synchronizeDatabase = async () => {
    try {
        console.log('🔄 Starting database synchronization...');
        
        // Get all parking lots
        const parkingLots = await AdminParkingLots.find();
        
        for (const lot of parkingLots) {
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

            // Count currently active bookings (within time window)
            const activeBookingsCount = await Booking.countDocuments({
                parkingLotId: lot._id,
                bookingStatus: 'Active',
                bookingDate: new Date(currentDate),
                startTime: { $lte: currentTime },
                endTime: { $gte: currentTime }
            });

            // Count future active bookings (not yet started)
            const futureBookingsCount = await Booking.countDocuments({
                parkingLotId: lot._id,
                bookingStatus: 'Active',
                $or: [
                    { bookingDate: { $gt: new Date(currentDate) } },
                    { 
                        bookingDate: new Date(currentDate),
                        startTime: { $gt: currentTime }
                    }
                ]
            });

            // Total spots calculation
            const totalSpots = lot.unreservedLots + lot.reservedLots;
            
            // Update parking lot availability
            lot.reservedLots = activeBookingsCount + futureBookingsCount;
            lot.unreservedLots = Math.max(0, totalSpots - lot.reservedLots);
            
            await lot.save();
            
            console.log(`✅ Synced ${lot.parkingLotName}: ${lot.unreservedLots} available, ${lot.reservedLots} reserved`);
        }

        // Update expired bookings to completed
        await updateBookingStatuses();
        
        console.log('✅ Database synchronization completed');
        return { success: true };
    } catch (error) {
        console.error('❌ Error synchronizing database:', error);
        return { success: false, error: error.message };
    }
};
