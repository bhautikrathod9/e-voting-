import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state
  const sidebarRef = useRef(null); // Reference to the sidebar element
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close sidebar if clicked outside
      }
    };

    if (isSidebarOpen) {
      // Add event listener only when the sidebar is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Cleanup event listener when sidebar is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup on component unmount or sidebar close
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('authorization');
    // Optionally, you can also remove the token from axios defaults
    delete axios.defaults.headers.common['authorization'];
    // Redirect to the login page
    navigate('/login'); // Change this to your desired route
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: isSidebarOpen ? "0" : "-250px", // Sidebar slides in and out
    width: "250px",
    height: "100vh",
    backgroundColor: "#1e1e1e", // Dark background for the sidebar
    paddingTop: "20px",
    color: "#fff", // White text for dark theme
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.5)",
    transition: "left 0.3s ease", // Smooth slide effect
    borderRadius: "0 8px 8px 0", // Rounded corners on the right side
  };

  const linkStyle = {
    color: "#007bff", // Link color
    textDecoration: "none",
    padding: "15px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s", // Added box-shadow transition
    borderBottom: "1px solid #333", // Darker border for separation
    display: "block", // Make the link a block element
    cursor: "pointer", // Change cursor to pointer
  };

  const linkHoverStyle = {
    backgroundColor: "#0056b3", // Darker blue background on hover
    color: "#fff", // White text on hover
    boxShadow: "0 0 10px rgba(0, 123, 255, 0.8)", // Glowing effect
  };

  // Define the links array
  const links = [
    { name: "Home", path: "/election-selection" },
    { name: "Elections", path: "/elections" },
    { name: "My Votes", path: "/my-votes" },
    { name: "Help", path: "/help" },
    { name: "Profile", path: "/profile" } // Add the Profile link with path
  ];

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div ref={sidebarRef} style ={sidebarStyle}>
        {links.map((link, index) => (
          <div 
            key={index}
            style={linkStyle} 
            onClick={() => navigate(link.path)} // Use navigate for redirection
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.color = linkHoverStyle.color;
              e.currentTarget.style.boxShadow = linkHoverStyle.boxShadow; // Add glowing effect
            }} 
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = '#007bff';
              e.currentTarget.style.boxShadow = 'none'; // Remove glow
            }}
          >
            {link.name}
          </div>
        ))}
        <div 
          onClick={handleLogout} // Handle logout on click
          style={linkStyle} 
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
            e.currentTarget.style.color = linkHoverStyle.color;
            e.currentTarget.style.boxShadow = linkHoverStyle.boxShadow; // Add glowing effect
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.color = '#007bff';
            e.currentTarget.style.boxShadow = 'none'; // Remove glow
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;