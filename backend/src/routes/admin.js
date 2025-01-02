const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const crypto = require('crypto'); // Import crypto for generating secret keys
const Admin = require('../models/admin'); // Import the Admin model
const router = express.Router();

// Route to register a new admin
router.post('/admin/register', async (req, res) => {
    const { username } = req.body; // Only username is required

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        // Generate a secret key
        const secretKey = crypto.randomBytes(16).toString('hex'); // Generate a random 16-byte secret key

        // Hash the secret key (optional, depending on your security requirements)
        const hashedSecretKey = await bcrypt.hash(secretKey, 10);

        // Create a new admin
        const newAdmin = new Admin({
            username,
            password: hashedSecretKey, // Store the hashed secret key
        });

        // Save the admin to the database
        await newAdmin.save();

        // Return the generated secret key
        return res.status(201).json({ success: true, message: 'Admin registered successfully', secretKey });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;