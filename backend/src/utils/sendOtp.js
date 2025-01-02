// otpService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const sendOtp = async (email, otp) => {
    // Create a transporter object using Mailgun SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailersend.net', // Mailgun SMTP hostname
        port: 587, // Recommended port
        auth: {
            user: 'MS_2LTjee@trial-jpzkmgqj3evl059v.mlsender.net', // Mailgun username
            pass: 'JzkIbrUTUqImgKfR', // Mailgun password
        },
    });

    // Set up email data
    const mailOptions = {
        from: 'MS_2LTjee@trial-jpzkmgqj3evl059v.mlsender.net', // Sender address
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