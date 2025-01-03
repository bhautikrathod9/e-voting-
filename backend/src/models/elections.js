const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    ongoing: { type: Boolean, default: true },
    image: { type: String, required: true },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;