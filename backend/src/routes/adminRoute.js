const express = require('express');
const crypto = require('crypto'); // Import crypto for generating secret keys
const Admin = require('../models/admin'); // Import the Admin model
const router = express.Router();

// Route to register a new admin
router.post('/register', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        // Generate a secret key
        const secretKey = crypto.randomBytes(16).toString('hex'); // Generate a random 16-byte key

        // Create a new admin
        const newAdmin = new Admin({
            email,
            secretKey,
        });

        // Save the admin to the database
        await newAdmin.save();

        return res.status(201).json({ success: true, message: 'Admin registered successfully', secretKey });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, secretKey } = req.body;

    if (!email || !secretKey) {
        return res.status(400).json({ success: false, message: 'Email and secret key are required' });
    }

    try {
        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid email or secret key' });
        }

        // Check if the secret key matches
        if (admin.secretKey !== secretKey) {
            return res.status(401).json({ success: false, message: 'Invalid email or secret key' });
        }

        // If login is successful, you can generate a token here (optional)
        // const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ success: true, message: 'Login successful' /*, token */ });
    } catch (error) {
        console.error('Error logging in admin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = router;