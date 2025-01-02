const express = require('express');
const { body, validationResult } = require('express-validator');
const { UserData } = require('../models/voter'); // Adjust the path as necessary

const router = express.Router();

// Route to add additional user data
router.post('', [
    body('userId').notEmpty().withMessage('User  ID is required'), // Validate userId
    body('name').notEmpty().withMessage('Name is required'),
    body('mobileNumber').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits long'),
    body('dateOfBirth').isDate().withMessage('Invalid date of birth'),
    body('votingId').notEmpty().withMessage('Voting ID is required'),
    body('walletAddress').notEmpty().withMessage('Wallet address is required') // Validate wallet address
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, name, mobileNumber, dateOfBirth, votingId, aadharId, walletAddress } = req.body;

    // Validate userId
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User  ID is required' });
    }

    try {
        // Create a new user data entry
        const userData = new UserData({
            user: userId, // Use the userId from the request body
            name,
            mobileNumber,
            dateOfBirth,
            votingId,
            aadharId,
            walletAddress // Save the wallet address from the request body
        });
        await userData.save();

        return res.status(201).json({ success: true, message: 'User  data added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;