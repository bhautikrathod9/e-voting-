const express = require('express');
const Election = require('../../models/elections'); // Import the Election model
const router = express.Router();

// Route to create a new election
router.post('/create', async (req, res) => {
    const { id, name, description, startTime, endTime, ongoing, image } = req.body;

    try {
        // Create a new election
        const newElection = new Election({
            id,
            name,
            description,
            startTime,
            endTime,
            ongoing,
            image,
        });

        // Save the election to the database
        await newElection.save();

        return res.status(201).json({ success: true, message: 'Election created successfully', election: newElection });
    } catch (error) {
        console.error('Error creating election:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

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

module.exports = router;