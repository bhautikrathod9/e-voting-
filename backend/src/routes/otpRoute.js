const express = require('express');
const { sendOtp } = require('../utils/sendOtp'); // Import the sendOtp function
const router = express.Router();
const { User } = require('../models/voter');
const jwt = require("jsonwebtoken");

// In-memory store for OTPs (for demonstration purposes only)
const otpStore = {}; // Ideally, use a database or a cache

// Route to send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await sendOtp(email, otp);
        otpStore[email] = otp;
        setTimeout(() => delete otpStore[email], 300000); // Remove OTP after 5 minutes

        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    console.log(`Verifying OTP for email: ${email}`); // Log the email being verified

    // Check if the OTP is valid
    if (otpStore[email] && otpStore[email] === otp) {
        // Delete the OTP after successful verification
        delete otpStore[email];

        // Fetch the user from the database
        const user = await User.findOne({ username : email });
        if (!user) {
            console.log(`User not found for email: ${email}`); // Log if user is not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email }, "bhautik", { expiresIn: '1h' }); // Adjust the payload and expiration as needed

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            token: token, // Send the token in the response
            walletAddress: user.walletAddress // Include the user's wallet address
        });
    }

    console.log(`OTP verification failed for email: ${email}. Provided OTP: ${otp}. Stored OTP: ${otpStore[email]}`);
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
});

module.exports = router;