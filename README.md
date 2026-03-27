## 🚗 Smart Car Parking System

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
