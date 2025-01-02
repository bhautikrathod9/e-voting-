import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const SecretKeyPage = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Initialize useNavigate
  const { secretKey } = location.state || {}; // Get the secret key from the location state

  // Function to handle navigation to the admin login page
  const handleNavigateToLogin = () => {
    navigate("/admin-login"); // Redirect to the admin login page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Secret Key</h2>
      {secretKey ? (
        <p style={styles.key}>{secretKey}</p>
      ) : (
        <p style={styles.error}>No secret key generated.</p>
      )}
      <button style={styles.button} onClick={handleNavigateToLogin}>
        Go to Admin Login
      </button>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
  },
  key: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default SecretKeyPage;