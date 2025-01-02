import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import Lottie from 'lottie-react';
import animationData from './Animation-1.json'; // Import your Lottie animation JSON
import axios from 'axios'; // Import axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:1000/api/auth/login', { username: email, password });

      if (response.data.success) {
          // Send OTP to the user's email
          const otpResponse = await axios.post('http://localhost:1000/api/send-otp', { email }); // Send OTP

          if (otpResponse.data.success) {
              // Redirect to the OTP verification page
              navigate("/otp-verification", { state: { email } }); // Pass email to OTP verification page
          } else {
              setError(otpResponse.data.message || 'Failed to send OTP. Please try again.');
          }
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
    setPassword("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <Lottie animationData={animationData} style={styles.image} />
      </div>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Login</h2>
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
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles (same as before)
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
    justifyContent: "center ", // Center the button
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
    marginTop: "20px",
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

export default Login;