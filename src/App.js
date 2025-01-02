// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import ElectionSelectionPage from "./components/ElectionSelectionPage";
import VotingPage from "./components/VotingPage";
import VoteConfirmationPage from "./components/VoteConfirmationPage";
import VoterHistoryPage from "./components/VoterHistoryPage";
import SignUp from "./components/signUp"; // Import the SignUp component
import Login from "./components/login"; // Import the Login component
import Form from './components/Form';
import ProfilePage from "./components/profilePage";
import OtpVerification from "./components/otpVerification"; // Import the OtpVerification component
import LandingPage from "./components/landingPage"; // Import the LandingPage component

function App() {
  const [currentElection, setCurrentElection] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track if user is signed up

  const handleVoteNow = (electionId) => {
    setCurrentElection(electionId); // Set the current election
  };

  const handleSubmitVote = (candidateId) => {
    const mockTransactionHash = `0x${Math.random().toString(16).slice(2, 10)}`;
    setTransactionHash(mockTransactionHash);
  };

  const handleReturnToDashboard = () => {
    setCurrentElection(null);
    setTransactionHash(null);
  };

  const handleSignUpComplete = () => {
    setIsSignedUp(true); // Update state to indicate user has signed up
  };

  return (
    <Router>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#121212",
          minHeight: "100vh",
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          color: "#fff",
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
          <Route path="/signup" element={<SignUp onSignUpComplete={handleSignUpComplete} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OtpVerification />} /> {/* Add OTP verification route */}
          <Route path="/election-selection" element={<ElectionSelectionPage onVoteNow={handleVoteNow} />} />
          <Route path="/voting" element={<VotingPage electionId={currentElection} onSubmitVote={handleSubmitVote} />} />
          <Route path="/confirmation" element={
            <VoteConfirmationPage
              transactionHash={transactionHash || "N/A"}
              onReturnToDashboard={handleReturnToDashboard}
            />
          } />
          <Route path="/history" element={<VoterHistoryPage onReturnToDashboard={handleReturnToDashboard} />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/form" element={isSignedUp ? <Form /> : <Navigate to="/signup" />} /> {/* Conditional rendering for form */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;