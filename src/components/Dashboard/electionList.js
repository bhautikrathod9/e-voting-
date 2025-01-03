import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const ElectionList = () => {
    const [elections, setElections] = useState([]); // State to store elections
    const [error, setError] = useState(''); // State to store error messages

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/election/electionlist'); // Adjust the URL as needed
                if (response.data.success) {
                    setElections(response.data.elections); // Set the fetched elections to state
                } else {
                    setError('Failed to fetch elections.');
                }
            } catch (err) {
                console.error('Error fetching elections:', err);
                setError('An error occurred while fetching elections.');
            }
        };

        fetchElections(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h2>Created Elections</h2>
            {error && <p className="error">{error}</p>} {/* Display error message if any */}
            <ul>
                {elections.map(election => (
                    <li key={election.id}>
                        {election.name} (From: {new Date(election.startTime).toLocaleDateString()} To: {new Date(election.endTime).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ElectionList;