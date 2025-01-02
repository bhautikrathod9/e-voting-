// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png'; // Correct import for the logo
import video from '../assets/Video2.mp4'; // Correct import for the video

const styles = {
  homePage: {
    position: 'relative',
    color: 'white',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '97%',
    zIndex: 100,
  },
  logo: {
    height: '60px',
    borderRadius: '50px',
    marginLeft: '20px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    paddingRight: '23px',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    transition: 'color 0.3s',
  },
  loginButton: {
    padding: '10px 4px',
    color: 'white',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s',
  },
  landingPage: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
    maxWidth: '800px',
  },
  h1: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  p: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  startButton: {
    padding: '15px 30px',
    backgroundColor: '#007bff', // Change to blue
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '25px',
    transition: 'background-color 0.3s, box-shadow 0.3s', // Add transition for smooth effect
  },
  startButtonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
    boxShadow: '0 0 15px rgba(0, 123, 255, 1)', // Glowing effect
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures the video covers the container
    zIndex: 1,
  },
};

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartClick = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div style={styles.homePage}>
      <nav style={styles.navbar}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <ul style={styles.navLinks}>
          <li><a href="#home" style={styles.navLink}>Home</a></li>
          <li><a href="#about" style={styles.navLink}>About Us</a></li>
          <li><a href="#login" style={styles.loginButton}>Login</a></li>
        </ul>
      </nav>
      <div style={styles.landingPage}>
        <video style={styles.backgroundVideo} src={video} autoPlay loop muted />
        <div style={styles.content}>
          <h1 style={styles.h1}>WEB3 BLOCKCHAIN VOTING SYSTEM</h1>
          <p style={styles.p}>
            Revolutionize the voting experience with our blockchain-based eVoting system, 
            designed for unmatched security and transparency. Empower voters with a tamper-proof, 
            decentralized platform ensuring trust and fairness in every election. Join us in shaping 
            the future of democracy with cutting-edge technology.
          </p>
          <button 
            style={styles.startButton} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.startButtonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.startButton.backgroundColor}
            onClick={handleStartClick}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;