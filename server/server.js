import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import parklotsRoute from './routes/parklots.js';
import bookingsRoute from './routes/bookings.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { updateBookingStatuses, synchronizeDatabase } from './utils/bookingScheduler.js';

dotenv.config();

console.log("ENV:", process.env.MONGODB_URL); // 👈 DEBUG LINE


const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB
//mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connect("mongodb://127.0.0.1:27017/SmartParkingSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


    .then(() => console.log('✅Connected to MongoDB'))
    .catch((err) => console.error('❌MongoDB connection error:', err));


// API: /api/auth Routes
app.use('/api/auth', authRoute);

// API: /api/parklots
app.use('/api/parklots', parklotsRoute);

// API: /api/bookings
app.use('/api/bookings', bookingsRoute);

// API: Server Health checking Route
app.get('/api/health', (req, res)=>{
    res.json({message: "Server is running!"});
});

// API: Token verification
app.get('/api/tokenverify', authMiddleware, (req, res)=>{
    const user = req.user;
    res.json({message: "✅You are Authorized", user});
});

// Middleware for handling Unknown API routes
app.use((req,res,next)=>{
    res.status(404).json({message:"404-API Route not found."});
});


// Automatic booking status updates based on timestamps
// Run every 1 minute to check and update booking statuses
const SYNC_INTERVAL = 60 * 1000; // 1 minute

setInterval(async () => {
    console.log('🔄 Running automatic booking status update...');
    await updateBookingStatuses();
}, SYNC_INTERVAL);

// Initial sync on server start
setTimeout(async () => {
    console.log('🚀 Running initial database synchronization...');
    await synchronizeDatabase();
}, 5000); // Wait 5 seconds after server start


// Start server
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
    console.log('⏰ Automatic booking sync enabled (runs every 1 minute)');
});