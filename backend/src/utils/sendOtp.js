// otpService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const sendOtp = async (email, otp) => {
    // Create a transporter object using Mailgun SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org', // Mailgun SMTP hostname
        port: 587, // Recommended port
        auth: {
            user: 'postmaster@sandboxf40c87ef72554867866bfb8b3c925163.mailgun.org', // Mailgun username
            pass: '702ab0dbdec04ebe1cca6c311b79904a-e61ae8dd-b4c281d5', // Mailgun password
        },
    });

    // Set up email data
    const mailOptions = {
        from: 'noreply@sandboxf40c87ef72554867866bfb8b3c925163.mailgun.org', // Sender address
        to: email, // List of recipients
        subject: 'Your OTP Code', // Subject line
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`, // Plain text body
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

module.exports = { sendOtp };