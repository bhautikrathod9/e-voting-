import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import axios from 'axios'; // Import axios
import { ethers } from 'ethers'; // Import ethers.js for MetaMask integration

const Form = () => {
  // State variables for controlled inputs
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [votingId, setVotingId] = useState("");
  const [aadharId, setAadharId] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Aadhar ID length
    if (aadharId.length !== 12) {
      setError("Aadhar ID must be 12 digits long.");
      return;
    }

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError("User  ID is not found. Please log in again.");
      return;
    }

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider for ethers.js v6
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress(); // Get the wallet address

        // Send a POST request to the backend API
        const response = await axios.post('http://localhost:1000/api/form', {
          userId, // Include userId in the request body
          name,
          mobileNumber,
          dateOfBirth,
          votingId,
          aadharId,
          walletAddress, // Include the retrieved wallet address
        });

        // Handle successful submission
        console.log(response.data); // Log the response from the server
        setName("");
        setMobileNumber("");
        setDateOfBirth("");
        setVotingId("");
        setAadharId("");
        setError("");

        localStorage.removeItem('userId');
        // Redirect to a confirmation page or another page
        navigate("/login"); // Redirect to the confirmation page
      } else {
        setError("Please install MetaMask to proceed.");
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || "An error occurred. Please try again."); // Set error message from server response
      } else {
        setError("An error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>User  Information Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number:</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              placeholder="Enter your mobile number"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth:</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Voting ID:</label>
            <input
              type="text"
              value={votingId}
              onChange={(e ) => setVotingId(e.target.value)}
              required
              placeholder="Enter your voting ID"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Aadhar ID:</label>
            <input
              type="text"
              value={aadharId}
              onChange={(e) => setAadharId(e.target.value)}
              required
              placeholder="Enter your Aadhar ID"
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>} {/* Render error message */}
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isHovered ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)} // Set hover state
              onMouseLeave={() => setIsHovered(false)} // Reset hover state
            >
              Submit
            </button>
          </div>
        </form>
        <p style={styles.footer}>
          Go back to{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles (updated for smaller height and centered)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center", // Center the form
    alignItems: "center",
    height: "70vh", // Full viewport height
    backgroundColor: "#121212",
    color: "#fff",
  },
  formCard: {
    padding: "20px", // Reduced padding for a smaller card
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
    maxWidth: "325px", // Reduced max width for a smaller card
    marginTop: "200px", // Margin from the top
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px", // Reduced margin
  },
  inputGroup: {
    marginBottom: "15px", // Reduced margin
  },
  label: {
    display: "block",
    marginBottom: "5px", // Reduced margin
  },
  input: {
    width: "93%",
    padding: "10px", // Adjusted padding
    borderRadius: "4px",
    marginBottom: "10px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // Center the button
  },
  button: {
    width: "50%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s", // Add transition for box-shadow
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)", // Initial shadow
  },
  buttonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
    boxShadow: "0 0 15px rgba(0, 123, 255, 1)", // Glowing effect on hover
  },
  footer: {
    textAlign: "center",
    marginTop: "15px", // Reduced margin
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default Form;