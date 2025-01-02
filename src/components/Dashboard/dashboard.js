import React, { useState } from 'react';
import CreateElectionForm from './createElectionForm';
import AddCandidateForm from './addCandidataeForm';
import ElectionList from './electionList';
import CandidateList from './candidateList';

const Dashboard = () => {
    const [activeForm, setActiveForm] = useState('createElection');

    const renderForm = () => {
        switch (activeForm) {
            case 'createElection':
                return <CreateElectionForm />;
            case 'addCandidate':
                return <AddCandidateForm />;
            case 'viewElections':
                return <ElectionList />;
            case 'viewCandidates':
                return <CandidateList />;
            default:
                return <CreateElectionForm />;
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <nav style={styles.nav}>
                <button onClick={() => setActiveForm('createElection')} style={styles.navButton}>Create Election</button>
                <button onClick={() => setActiveForm('addCandidate')} style={styles.navButton}>Add Candidates</button>
                <button onClick={() => setActiveForm('viewElections')} style={styles.navButton}>View Elections</button>
                <button onClick={() => setActiveForm('viewCandidates')} style={styles.navButton}>View Candidates</button>
            </nav>
            <div style={styles.formCard}>
                {renderForm()}
            </div>
        </div>
    );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Align items vertically
    justifyContent: "center", // Center the form
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "#121212",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif", // Add a modern font
  },
  formCard: {
    padding: "20px", // Reduced padding for a smaller card
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 0 50px rgba(0, 123, 255, 0.5)",
    maxWidth: "400px", // Increased max width for better layout
    width: "90%", // Responsive width
    marginTop: "20px", // Margin from the top
  },
  title: {
    textAlign: "center",
    marginBottom: "20px", // Increased margin for better spacing
    fontSize: "24px", // Larger font size for title
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%", // Full width for navigation
    marginBottom: "20px", // Space between nav and form
  },
  navButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    fontSize: "16px", // Increased font size for buttons
  },
  navButtonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
    transform: "scale(1.05)", // Slightly enlarge on hover
  },
  formInput: {
    width: "100%", // Full width for inputs
    padding: "12px", // Increased padding for better usability
    margin: "8px 0", // Adjusted margin for spacing between fields
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
  },
  formButton: {
    padding: "12px 20px", // Increased padding for better usability
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "16px", // Increased font size for buttons
  },
  formButtonHover: {
    backgroundColor: "#218838", // Darker green on hover
  },
  formRow: {
    display: "flex",
    justifyContent: "center", // Center the input fields
    flexDirection: "column", // Stack inputs vertically
    width: "100%", // Full width for the row
  },
};

export default Dashboard;