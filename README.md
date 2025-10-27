# LuxeStay - Hotel Reservation System

A modern, responsive hotel reservation system built with React, Redux Toolkit, and Tailwind CSS. This application provides a complete booking experience with user authentication, room browsing, filtering, and reservation management.

## 🌟 Features

- **User Authentication**: Mock authentication system with localStorage persistence
- **Room Browsing**: Paginated list of hotel rooms with beautiful card-based UI
- **Advanced Filtering**: Filter rooms by price range and room type
- **Room Details**: Comprehensive room information with amenities and booking interface
- **Date Selection**: Interactive calendar for check-in and check-out dates
- **Booking System**: Complete reservation flow with availability checking
- **User Dashboard**: Personal dashboard to view and manage reservations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit with persistent localStorage
- **Toast Notifications**: User-friendly feedback system

## 🚀 Quick Start

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.jsx      # Navigation bar
│   ├── RoomCard.jsx    # Room card component
│   └── RoomFilters.jsx # Filtering sidebar
├── pages/              # Page components
│   ├── Home.jsx        # Landing page with room list
│   ├── RoomDetails.jsx # Individual room details
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration page
│   └── Dashboard.jsx   # User dashboard
├── store/              # Redux store configuration
│   ├── store.js        # Store setup
│   └── slices/         # Redux slices
│       ├── authSlice.js
│       ├── roomsSlice.js
│       └── reservationsSlice.js
├── services/           # Mock data and API services
│   └── mockData.js     # Sample room data
├── App.jsx             # Main app component
└── main.jsx           # Application entry point
```

## 📖 Usage Guide

### Browsing Rooms

1. Navigate to the home page to see all available rooms
2. Use the sidebar filters to narrow down by price range or room type
3. Browse through paginated results (6 rooms per page)
4. Click "View Details" to see comprehensive room information

### Making a Reservation

1. Click on a room to view details
2. If not logged in, you'll need to sign up or log in
3. Select check-in and check-out dates using the calendar
4. Review the total price calculation
5. Click "Book Now" to confirm your reservation
6. You'll be redirected to your dashboard upon successful booking

### Managing Reservations

1. Navigate to your Dashboard after logging in
2. View all your reservations with detailed information
3. Cancel reservations if needed (this will free up the room)
4. See statistics including total spent and active bookings

## 🔐 Authentication

The authentication system is mock-based using localStorage:

- No real backend validation
- User data persists across browser sessions
- Suitable for demonstration and development purposes


## 💾 Data Persistence

- **User Sessions**: Stored in localStorage under 'auth' key
- **Reservations**: Stored in localStorage under 'reservations' key
- **Room Availability**: Updated in Redux state and reflected in real-time

## 🎯 Key Features Explained

### Pagination

- 6 rooms displayed per page
- Navigation buttons for easy browsing
- Resets to page 1 when filters are applied

### Filters

- **Price Range**: Slider from $0 to $1000
- **Room Type**: Dropdown with all available types
- Real-time filtering with instant results

### Availability System

- Rooms marked as unavailable after booking
- Visual indicators (badges) for availability status
- Booking button disabled for unavailable rooms

### Responsive Design

- Mobile-first approach
- Collapsible mobile menu
- Stacked layouts on small screens
- Grid layouts on larger screens

## 🚀 Deployment

## 🎬 Demo Instructions

### Sample User Flow

1. **First Visit**

   - View the luxurious hero section
   - Browse 12 sample rooms with various types and prices
   - Apply filters (try: $200-$400, Deluxe Suite)
   - Navigate through pagination

2. **Sign Up**

   - Click "Sign Up" in the navigation
   - Fill in your details (any email format works)
   - Get redirected to home with a welcome message

3. **Book a Room**

   - Select any available room
   - Choose check-in and check-out dates
   - See the automatic price calculation
   - Click "Book Now" to confirm

4. **Manage Bookings**

   - Navigate to Dashboard
   - View your reservation statistics
   - See all booking details
   - Try canceling a reservation (room becomes available again)

5. **Logout and Login**
   - Logout from the menu
   - Login again with the same email
   - Your data persists thanks to localStorage
