// otpService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const sendOtp = async (email, otp) => {
    // Create a transporter object using Mailgun SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org', // Mailgun SMTP hostname
        port: 587, // Recommended port
        auth: {
            user: 'postmaster@sandbox73e79200879742a0871d15fa9edfc7e1.mailgun.org', // Mailgun username
            pass: 'f4012eb253695c2bea16237238b7350f-e61ae8dd-d615367e', // Mailgun password
        },
    });

    // Set up email data
    const mailOptions = {
        from: 'postmaster@sandbox73e79200879742a0871d15fa9edfc7e1.mailgun.org', // Sender address
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