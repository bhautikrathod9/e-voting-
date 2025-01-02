import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios

const OtpVerification = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Initialize useNavigate
    const email = location.state?.email; // Get the email from the location state
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for resend OTP

    const handleVerifyOtp = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error message

        try {
            const response = await axios.post('http://localhost:1000/api/verify-otp', { email, otp });
            if (response.data.success) {
                setSuccess(true); // Set success state
                localStorage.setItem("authorization : ", response.data.token);
                navigate('/election-selection'); // Change this to your desired route
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Invalid OTP. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleResendOtp = async (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        setLoading(true); // Set loading state
        setError(''); // Reset error message
    
        console.log("Resending OTP for email:", email); // Debugging log
    
        try {
            const response = await axios.post('http://localhost:1000/api/send-otp', { email });
            console.log("Response from resend OTP:", response.data); // Debugging log
            if (response.data.success) {
                setSuccess(true); // Set success state
                // Optionally, show a message indicating the OTP has been resent
            }
        } catch (err) {
            console.error("Error resending OTP:", err); // Debugging log
            setError(err.response?.data.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formCard}>
                <h2 style={styles.title}>OTP Verification</h2>
                <form onSubmit={handleVerifyOtp}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Enter OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    {success && <p style={styles.success}>OTP verified successfully!</p>}
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button} onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    </div>
                </form>
                <p style={styles.footer}>
                    Didn't receive the OTP? 
                    <a href="#" onClick={handleResendOtp} style={styles.link}>
                        {loading ? 'Resending...' : 'Resend OTP'}
                    </a>
                </p>
            </div>
        </div>
    );
};

// Styles for the OTP verification page
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
    },
    formCard: {
        padding: "40px",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
        maxWidth: "400px",
        width: "100%",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    inputGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        marginBottom: "10px",
        border: "1px solid #333",
        backgroundColor: "#2a2a2a",
        color: "#fff",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        width: "50%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    footer: {
        textAlign: "center",
        marginTop: "20px",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        cursor: "pointer",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
    success: {
        color: "green",
        textAlign: "center",
    },
};

export default OtpVerification;
