const express = require('express');
const Election = require('../../models/elections'); // Import the Election model
const router = express.Router();

// Route to get all elections
router.get('/electionlist', async (req, res) => {
    try {
        const elections = await Election.find(); // Fetch all elections from the database
        return res.status(200).json({ success: true, elections });
    } catch (error) {
        console.error('Error fetching elections:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Other routes (e.g., create election) can go here

module.exports = router;