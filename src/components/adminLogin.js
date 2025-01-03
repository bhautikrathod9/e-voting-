import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import Lottie from 'lottie-react';
import animationData from './Animation-1.json'; // Import your Lottie animation JSON
import axios from 'axios'; // Import axios

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState(""); // State for unique secret key
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:1000/api/admin/login', { email, secretKey });

      if (response.data.success) {
        // Redirect to the admin dashboard or another page
        navigate("/dashboard"); // Change this to your admin dashboard route
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }

    // Reset the form
    setEmail("");
    setSecretKey("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <Lottie animationData={animationData} style={styles.image} />
      </div>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Secret Key:</label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
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
              Login
            </button>
          </div>
        </form>
        <p style={styles.footer}>
          Back to{" "}
          <Link to="/login" style={styles.link}>
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between", // Space between animation and form
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    padding: "0 20px", // Add padding to the container
  },
  imageContainer: {
    flex: 1, // Take up one part of the space
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "60%", // Set a maximum width for the animation
    height: "auto",
  },
  formCard: {
    padding: "60px",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
    maxWidth: "400px",
    width: "100%",
    margin: "0 20px", // Add margin to the form card
  },
  title: {
    textAlign: "center",
    fontSize: " 24px",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a", // Change background color of input fields
    color: "#fff", // Change text color of input fields
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default AdminLogin;