const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
});

// Middleware to update the updatedAt field before saving
adminSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;