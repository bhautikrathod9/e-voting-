const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the database connection function
const connectDB = require('./src/config/db');
const authenticateToken = require('./src/middleware/authenticate'); // Middleware for token authentication
const authRoutes = require('./src/routes/authRoute'); // User authentication routes
const adminRoutes = require('./src/routes/adminRoute'); // Admin routes
const formRoutes = require('./src/routes/form'); // Form routes
const otpRoute = require('./src/routes/otpRoute'); // OTP routes
const electionRoutes = require('./src/routes/election-routes/election'); // Election routes

const app = express();
const PORT = 1000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// User authentication routes
app.use('/api/auth', authRoutes);

// Admin routes (protected)
app.use('/api/admin', authenticateToken, adminRoutes); // Protect admin routes with authentication middleware

// Form routes
app.use('/api/form', formRoutes);

// OTP routes
app.use('/api/otp', otpRoute);

// Election routes
app.use('/api/election', electionRoutes); // Use the election routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});