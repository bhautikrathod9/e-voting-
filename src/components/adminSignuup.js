import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios'; // Import axios
import animationData from './Animation-1.json';
import Lottie from "lottie-react";

const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API for admin registration
      const response = await axios.post('http://localhost:1000/api/auth/admin/register', {
        username: email, // Assuming you want to use email as username
      });

      // Handle successful registration
      console.log(response.data); // Log the response from the server
      setEmail("");
      setError("");

      // Redirect to the secret key page after sign-up, passing the secret key
      navigate("/secret-key", { state: { secretKey: response.data.secretKey } }); // Redirect to the secret key page
    } catch (err) {
      // Handle errors (e.g., user already exists)
      if (err.response) {
        setError(err.response.data.message || "An error occurred. Please try again."); // Set error message from server response
      } else {
        setError("An error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <Lottie animationData={animationData} style={styles.image} />
      </div>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Admin Sign Up</h2>
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
          {error && <p style={styles.error}>{error}</p>} {/* Render error message */}
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={styles.button}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/admin-login" style={styles.link}>
            Login here
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

export default AdminSignUp;