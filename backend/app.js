const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the database connection function
const connectDB = require('./src/config/db');
const authenticateToken = require('./src/middleware/authenticate'); // Middleware for token authentication
const authRoutes = require('./src/routes/authRoute'); // User authentication routes
const adminRoutes = require('./src/routes/adminRoute'); // Admin routes
const Form = require('./src/routes/form'); // Form routes
const otpRoute = require('./src/routes/otpRoute'); // OTP routes

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
app.use('/api/admin', adminRoutes); // Protect admin routes with authentication middleware

// Form routes
app.use('/api/form', Form);

// OTP routes
app.use('/api/otp', otpRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});