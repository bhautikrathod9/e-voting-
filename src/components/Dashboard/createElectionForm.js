import React, { useState } from 'react';

const CreateElectionForm = () => {
    const [electionName, setElectionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!electionName || !startDate || !endDate) {
            setError('All fields are required.');
            return;
        }

        // Handle election creation logic here
        console.log('Election Created:', { electionName, startDate, endDate });

        // Reset form fields
        setElectionName('');
        setStartDate('');
        setEndDate('');
        setError(''); // Clear error message
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

                    .election-form input {
                        margin-bottom: 10px;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        background-color: black;
                        color:white;
                        
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
                `}
            </style>
            <form onSubmit={handleSubmit} className="election-form">
                <h2>Create Election</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Election Name"
                    value={electionName}
                    onChange={(e) => setElectionName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit">Create Election</button>
            </form>
        </div>
    );
};

export default CreateElectionForm;