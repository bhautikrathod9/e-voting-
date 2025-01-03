import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const CreateElectionForm = () => {
    const [electionName, setElectionName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ongoing, setOngoing] = useState(true);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [success, setSuccess] = useState(false); // Success state

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!electionName || !description || !startDate || !endDate || !image) {
            setError('All fields are required.');
            return;
        }

        // Check if end date is after start date
        if (new Date(endDate) < new Date(startDate)) {
            setError('End date must be after start date.');
            return;
        }

        // Handle election creation logic here
        const newElection = {
            id: Date.now() + Math.floor(Math.random() * 1000), // Generate a unique ID
            name: electionName,
            description,
            startTime: startDate,
            endTime: endDate,
            ongoing,
            image,
        };

        setLoading(true); // Set loading state
        setError(''); // Clear previous errors
        setSuccess(false); // Reset success state

        try {
            // Make a POST request to the API
            const response = await axios.post('http://localhost:1000/api/election/create', newElection);
            console.log('Election Created:', response.data);
            setSuccess(true); // Set success state

            // Reset form fields
            setElectionName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setOngoing(true);
            setImage('');
        } catch (err) {
            console.error('Error creating election:', err);
            setError(err.response?.data?.message || 'Failed to create election. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <style>
                {`
                    .election-form {
                        display: flex;
                        flex-direction: column;
                        max-width: 400px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: black;
                        color: white;
                    }

                    .election-form input, .election-form textarea {
                        margin-bottom: 10px;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        background-color: black;
                        color: white;
                    }

                    .election-form button {
                        padding: 10px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .election-form button:hover {
                        background-color: #0056b3;
                    }

                    .error {
                        color: red;
                        margin-bottom: 10px;
                    }

                    .loading {
                        color: yellow;
                        margin-bottom: 10px;
                    }

                    .success {
                        color: green;
                        margin-bottom: 10px;
                    }
                `}
            </style>
            <form onSubmit={handleSubmit} className="election-form" aria-label="Create Election Form">
                <h2>Create Election</h2>
                {error && <p className="error">{error}</p>}
                {loading && <p className="loading">Creating election...</p>}
                {success && <p className="success">Election created successfully!</p>}
                <input
 type="text"
                    placeholder="Election Name"
                    value={electionName}
                    onChange={(e) => setElectionName(e.target.value)}
                    required
                    aria-label="Election Name"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    aria-label="Description"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    aria-label="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    aria-label="End Date"
                />
                <input
                    type="url"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    aria-label="Image URL"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={ongoing}
                        onChange={(e) => setOngoing(e.target.checked)}
                        aria-label="Ongoing Election"
                    />
                    Ongoing
                </label>
                <button type="submit" disabled={loading}>Create Election</button>
            </form>
        </div>
    );
};

export default CreateElectionForm;