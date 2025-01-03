const mongoose = require('mongoose');

// Define the election schema
const electionSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true // Ensure that each election has a unique ID
    },
    name: { 
        type: String, 
        required: true // Election name is required
    },
    description: { 
        type: String, 
        required: true // Election description is required
    },
    startTime: { 
        type: Date, 
        required: true // Start time is required
    },
    endTime: { 
        type: Date, 
        required: true // End time is required
    },
    ongoing: { 
        type: Boolean, 
        default: true // Default value for ongoing is true
    },
    image: { 
        type: String, 
        required: true // Image URL is required
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the Election model
const Election = mongoose.model('Election', electionSchema);

// Export the Election model
module.exports = Election;