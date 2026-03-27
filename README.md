# 🚗 Smart Car Parking System

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

**A modern, full-stack parking management solution with real-time availability tracking, automated booking management, and comprehensive analytics.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

The **Smart Car Parking System** is a comprehensive web application designed to modernize parking management. It provides real-time parking availability tracking, automated booking management with timestamp-based status updates, and detailed analytics for both users and administrators.

Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this system offers a seamless experience for finding, booking, and managing parking spaces while providing administrators with powerful tools to manage multiple parking lots and track revenue.

---

## ✨ Features

### 👤 User Features

- **🔐 Secure Authentication**
  - JWT-based authentication system
  - Role-based access control (User/Admin)
  - Secure password hashing with bcrypt

- **🅿️ Smart Parking Search**
  - Browse available parking lots by location
  - Real-time availability status
  - Filter by location, rate, and vehicle type

- **📅 Intelligent Booking System**
  - Book parking spots with specific date and time slots
  - Automatic duration calculation (including minutes)
  - Real-time conflict detection (prevents double booking)
  - Dynamic pricing based on duration
  - Instant booking confirmation

- **📊 Personal Dashboard**
  - View all bookings (Active, Completed, Cancelled)
  - Real-time statistics (total spent, total hours)
  - Quick access to recent bookings
  - Booking history with detailed information

- **🎫 Booking Management**
  - View active reservations with countdown
  - Cancel bookings with instant refund processing
  - Track booking status in real-time
  - Detailed booking receipts

- **👤 Profile Management**
  - View and edit account information
  - Update password securely
  - View booking statistics and history
  - Manage preferences

### 🔧 Admin Features

- **📈 Comprehensive Dashboard**
  - Real-time parking lot statistics
  - Revenue tracking (Today, Week, Month, Lifetime)
  - Active vs. occupied spots monitoring
  - Booking trends and analytics

- **🏢 Parking Lot Management**
  - Add, edit, and delete parking lots
  - Set custom rates per hour
  - Manage total spots and availability
  - Location-based organization

- **💰 Revenue Analytics**
  - Today's earnings with payment completion rate
  - Weekly and monthly revenue reports
  - Total lifetime revenue tracking
  - Payment status monitoring

- **📋 Booking Oversight**
  - View all bookings across all parking lots
  - Monitor active, completed, and cancelled reservations
  - User booking details and vehicle information
  - Export booking data

- **⏱️ Automated Management**
  - Timestamp-based automatic status updates
  - Auto-mark bookings as "Completed" when time expires
  - Real-time parking spot availability sync
  - Automatic database synchronization every 60 seconds

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
Modern landing page with hero section and feature highlights.

### User Dashboard
Real-time statistics showing active bookings, total spent, and booking history.

### Admin Dashboard
Comprehensive analytics with revenue insights, parking lot management, and booking overview.

### Booking Modal
Interactive booking form with real-time price calculation and availability check.

### My Bookings
Organized view of all reservations sorted by status (Active → Completed → Cancelled).

</details>

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library with hooks
- **React Router DOM 7.8.2** - Client-side routing
- **Axios 1.11.0** - HTTP client for API requests
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Vite 7.1.2** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.0** - MongoDB object modeling

### Authentication & Security
- **JSON Web Token (jsonwebtoken 9.0.2)** - Secure authentication
- **bcrypt 6.0.0** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Development Tools
- **Nodemon 3.1.9** - Auto-restart server on file changes
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React Client  │
│   (Port 5173)   │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express Server │
│   (Port 2025)   │
└────────┬────────┘
         │
         │ Mongoose ODM
         │
┌────────▼────────┐
│    MongoDB      │
│    Database     │
└─────────────────┘
```

### Key Components

- **Authentication Middleware**: JWT verification for protected routes
- **Booking Scheduler**: Automatic status updates every 60 seconds
- **Real-time Sync**: Database synchronization for parking availability
- **Conflict Detection**: Prevents overlapping bookings

---

## 📦 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/Smart-Parking-Spot-Finder/Smart-Car-Parking-Debargha.git
cd Smart-Car-Parking-Debargha
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages for both frontend and backend.

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and start the service
mongod --dbpath /path/to/your/data
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the connection string in `server/server.js`

### Step 4: Configure Environment

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=2025
MONGODB_URI=mongodb://localhost:27017/car-parking-system

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

**⚠️ Important**: Change the `JWT_SECRET` to a strong, random string in production!

---

## ⚙️ Configuration

### Database Configuration

Update the MongoDB connection in `server/server.js`:

```javascript
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/car-parking-system")
```

### Server Port Configuration

The backend server runs on port **2025** by default. To change:

```javascript
// server/server.js
const PORT = process.env.PORT || 2025;
```

### Frontend API Endpoint

Update API base URL in frontend files if needed:

```javascript
// Default: http://localhost:2025/api
const API_URL = 'http://localhost:2025/api';
```

---

## 🚀 Usage

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```
Server will run on `http://localhost:2025`

**Terminal 2 - Start Frontend Development Server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

```bash
# Build frontend for production
npm run build

# Preview production build
npm run preview
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:2025
- **API Health Check**: http://localhost:2025/api/health

---

## 📡 API Documentation

### Base URL
```
http://localhost:2025/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "User"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

#### Verify Token
```http
GET /auth/tokenverify
Authorization: Bearer <token>
```

### Parking Lot Endpoints

#### Get All Parking Lots
```http
GET /parklots/getall
```

#### Get Admin's Parking Lots
```http
POST /parklots/getlots
Content-Type: application/json

{
  "email": "admin@example.com"
}
```

#### Add Parking Lot (Admin Only)
```http
POST /parklots/addlot
Authorization: Bearer <token>
Content-Type: application/json

{
  "parkingLotName": "Downtown Parking",
  "parkingLotLocation": "New York",
  "parkingLotAddress": "123 Main St, NY 10001",
  "unreservedLots": 50,
  "reservedLots": 0,
  "rate": 100
}
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "parkingLotId": "507f1f77bcf86cd799439011",
  "vehicleNumber": "ABC-1234",
  "vehicleType": "Car",
  "bookingDate": "2025-10-30",
  "startTime": "09:00",
  "endTime": "17:00",
  "duration": 8
}
```

#### Get User's Bookings
```http
GET /bookings/my-bookings
Authorization: Bearer <token>
```

#### Get All Bookings (Admin Only)
```http
GET /bookings/all
Authorization: Bearer <token>
```

#### Cancel Booking
```http
PUT /bookings/cancel/:bookingId
Authorization: Bearer <token>
```

#### Get Real-Time Availability
```http
GET /bookings/availability/:parkingLotId
```

#### Manual Database Sync
```http
POST /bookings/sync
Authorization: Bearer <token>
```

---

## 🗄️ Database Schema

### Collections

#### 1. User Authentication
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['User', 'Admin']),
  createdAt: Date
}
```

#### 2. Admin Authentication
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'Admin'),
  createdAt: Date
}
```

#### 3. Admin Parking Lots
```javascript
{
  email: String (required),
  parkingLotName: String (required),
  parkingLotLocation: String (required),
  parkingLotAddress: String (required),
  unreservedLots: Number (required),
  reservedLots: Number (default: 0),
  rate: Number (required),
  createdAt: Date
}
```

#### 4. Bookings
```javascript
{
  userEmail: String (required),
  userName: String (required),
  parkingLotId: ObjectId (ref: 'AdminParkingLots'),
  parkingLotName: String (required),
  parkingLotLocation: String (required),
  parkingLotAddress: String (required),
  vehicleNumber: String (required, uppercase),
  vehicleType: String (enum: ['Car', 'Bike', 'SUV', 'Truck']),
  bookingDate: Date (required),
  startTime: String (required, format: 'HH:MM'),
  endTime: String (required, format: 'HH:MM'),
  duration: Number (required, in hours),
  rate: Number (required),
  totalAmount: Number (required),
  paymentStatus: String (enum: ['Pending', 'Completed', 'Failed', 'Refunded']),
  bookingStatus: String (enum: ['Active', 'Completed', 'Cancelled']),
  createdAt: Date
}
```

---

## 📁 Project Structure

```
CAR-PARKING-SYSTEM/
├── server/
│   ├── server.js                 # Main server file
│   ├── middlewares/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── UserAuthentication.js # User schema
│   │   ├── AdminAuthentication.js# Admin schema
│   │   ├── AdminParkingLots.js   # Parking lot schema
│   │   └── Bookings.js           # Booking schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── parklots.js           # Parking lot routes
│   │   └── bookings.js           # Booking routes
│   └── utils/
│       └── bookingScheduler.js   # Automatic booking management
├── src/
│   ├── components/
│   │   ├── NavBar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   ├── PlotCards.jsx         # Parking lot card
│   │   └── BookingModal.jsx      # Booking form modal
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── About.jsx             # About page
│   │   ├── ContactUs.jsx         # Contact page
│   │   ├── Pricing.jsx           # Pricing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Signup.jsx            # Registration page
│   │   ├── UserDashboard.jsx     # User dashboard
│   │   ├── AdminDashboard.jsx    # Admin dashboard
│   │   ├── Profile.jsx           # User/Admin profile
│   │   ├── Bookings.jsx          # Browse parking lots
│   │   ├── Plots.jsx             # Parking lot details
│   │   ├── MyBookings.jsx        # User's bookings
│   │   ├── ManageParkingLots.jsx # Admin parking management
│   │   ├── Logout.jsx            # Logout page
│   │   └── NotFound.jsx          # 404 page
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # Project documentation
```

---

## 🔄 Automated Features

### Booking Status Management

The system includes an **automated scheduler** that runs every 60 seconds:

```javascript
// Updates booking status based on timestamps
setInterval(updateBookingStatuses, 60000);

// Initial database synchronization on startup
setTimeout(synchronizeDatabase, 5000);
```

**What it does:**
- ✅ Checks all active bookings
- ✅ Compares current time with booking `endTime`
- ✅ Marks expired bookings as "Completed"
- ✅ Frees up parking spots automatically
- ✅ Recalculates availability across all lots

### Conflict Detection

Prevents double booking with intelligent time slot validation:

```javascript
// Checks for overlapping bookings in the same time slot
- New booking starts during an existing booking
- New booking ends during an existing booking
- New booking completely contains an existing booking
```

---

## 💡 Key Functionalities

### Duration Calculation

The system calculates precise parking duration including minutes:

```javascript
// Example: 2:30 PM to 5:45 PM = 3.25 hours
duration = (endMinutes - startMinutes) / 60
```

### Dynamic Pricing

```javascript
totalAmount = duration (hours) × rate (per hour)
// Example: 3.25 hours × ₹100/hour = ₹325.00
```

### Real-Time Availability

```javascript
availableSpots = totalSpots - activeBookings
```

---

## 🧪 Testing

### Manual Testing Checklist

**User Flow:**
- [ ] Register new user account
- [ ] Login with credentials
- [ ] Browse parking lots
- [ ] Create booking with specific time slot
- [ ] View booking in "My Bookings"
- [ ] Cancel active booking
- [ ] Check profile statistics

**Admin Flow:**
- [ ] Login as admin
- [ ] Add new parking lot
- [ ] View dashboard analytics
- [ ] Monitor all bookings
- [ ] Check revenue reports
- [ ] Edit parking lot details

**Automated Features:**
- [ ] Wait for booking end time to pass
- [ ] Verify automatic status change to "Completed"
- [ ] Check parking spot availability update
- [ ] Confirm database synchronization

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Cannot connect to MongoDB**
```
Solution: 
1. Check if MongoDB is running: `mongod`
2. Verify connection string in server.js
3. Check firewall settings
```

**Issue: Port already in use**
```
Solution:
1. Kill process on port 2025: `npx kill-port 2025`
2. Or change port in server.js
```

**Issue: JWT token expired**
```
Solution:
1. Logout and login again
2. Token expires after 7 days (configurable)
```

**Issue: Bookings not auto-updating**
```
Solution:
1. Check server console for scheduler logs
2. Verify system time is correct
3. Check MongoDB connection
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test before submitting PR

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Smart Parking Spot Finder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📞 Contact

**Project Maintainer:** Debargha Biswas

**Repository:** [Smart-Car-Parking-Debargha](https://github.com/Smart-Parking-Spot-Finder/Smart-Car-Parking-Debargha)

**Issues:** [Report a Bug](https://github.com/Smart-Parking-Spot-Finder/Smart-Car-Parking-Debargha/issues)

---

## 🎯 Future Enhancements

- [ ] **Payment Gateway Integration** - Stripe/PayPal integration
- [ ] **Email Notifications** - Booking confirmations and reminders
- [ ] **SMS Alerts** - Real-time booking updates
- [ ] **QR Code Generation** - Digital parking passes
- [ ] **Mobile App** - React Native version
- [ ] **Advanced Analytics** - ML-based predictions
- [ ] **Map Integration** - Google Maps for location
- [ ] **Multi-language Support** - i18n implementation
- [ ] **Dark Mode** - Theme switching
- [ ] **Parking Sensors Integration** - IoT integration
- [ ] **Loyalty Program** - Rewards for frequent users
- [ ] **Admin Mobile App** - On-the-go management

---

## 📊 Project Stats

- **Total Files:** 30+
- **Lines of Code:** 5000+
- **Components:** 15+
- **API Endpoints:** 15+
- **Database Collections:** 4

---

## 🙏 Acknowledgments

- **React Team** - For the amazing library
- **MongoDB** - For the flexible database
- **Express.js** - For the robust backend framework
- **Tailwind CSS** - For the beautiful styling system
- **Vite** - For the lightning-fast build tool

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by Debargha Biswas**

[⬆ Back to Top](#-smart-car-parking-system)

</div>