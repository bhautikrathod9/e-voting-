// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the database connection function
const connectDB = require('./src/config/db');
const authenticateToken = require('./src/middleware/authenticate');
const authRoutes = require('./src/routes/authRoute');
const Form = require('./src//routes/form');
const otpRoute = require('./src/routes/otpRoute');

const app = express();
const PORT = 1000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/form', Form);
app.use('/api/', otpRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});