import React, { useState } from 'react';

const AddCandidateForm = () => {
    const [electionId, setElectionId] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!electionId || !candidateName || !description) {
            setError('All fields are required.');
            return;
        }

        // Handle candidate addition logic here
        console.log('Candidate Added:', { electionId, candidateName, description });

        // Reset form fields
        setElectionId('');
        setCandidateName('');
        setDescription('');
        setError(''); // Clear error message
    };

    return (
        <div>
            <style>
                {`
                    .candidate-form {
                        display: flex;
                        flex-direction: column;
                        max-width: 400px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: black;
                    }

                    .candidate-form input,
                    .candidate-form textarea {
                        margin-bottom: 10px;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        background-color: black;
                        color: white;
                    }

                    .candidate-form button {
                        padding: 10px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .candidate-form button:hover {
                        background-color: #0056b3;
                    }

                    .error {
                        color: red;
                        margin-bottom: 10px;
                    }
                `}
            </style>
            <form onSubmit={handleSubmit} className="candidate-form">
                <h2>Add Candidate</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Election ID"
                    value={electionId}
                    onChange={(e) => setElectionId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Candidate Name"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Candidate</button>
            </form>
        </div>
    );
};

export default AddCandidateForm;