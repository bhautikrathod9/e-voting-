import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios
import { ethers } from 'ethers'; // Import ethers.js for MetaMask integration

const OtpVerification = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Initialize useNavigate
    const email = location.state?.email; // Get the email from the location state
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [walletAddress, setWalletAddress] = useState(''); // State to store the user's wallet address

    const handleVerifyOtp = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error message
        setLoading(true); // Set loading state

        try {
            const response = await axios.post('http://localhost:1000/api/verify-otp', { email, otp });
            if (response.data.success) {
                setSuccess(true); // Set success state
                setWalletAddress(response.data.walletAddress); // Store the wallet address from the response
                setOtp(''); // Clear the OTP input field
                // Integrate MetaMask
                await connectMetaMask(response.data.walletAddress); // Pass the wallet address to the connect function
            }

            localStorage.setItem("authorization", response.data.token)
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Invalid OTP. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const connectMetaMask = async (expectedAddress) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider for ethers.js v6
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                console.log('Connected to MetaMask with address:', address);

                // Check if the connected address matches the user's wallet address
                navigate('/election-selection');
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                alert('Failed to connect to MetaMask. Please try again.');
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>OTP Verification</h2>
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        placeholder="Enter OTP"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>OTP verified successfully! Connecting to MetaMask...</p>}
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
    },
    card: {
        padding: '40px',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        boxShadow: '0 0 50px rgba(0, 123, 255, 0.5)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        margin: '10px 0px',
        borderRadius: '4px',
        border: '1px solid #333',
        backgroundColor: '#2a2a2a',
        color: '#fff',
        width: '95%',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '100%',
        fontSize: '16px',
    },
    buttonDisabled: {
        backgroundColor: '#555',
        cursor: 'not-allowed',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
};

export default OtpVerification;