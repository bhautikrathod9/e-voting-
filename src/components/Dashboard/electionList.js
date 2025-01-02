import React from 'react';

const ElectionList = () => {
    // Placeholder for election data
    const elections = [
        { id: 1, name: 'Election 2023', startDate: '2023-01-01', endDate: '2023-01-10' },
        // Add more elections as needed
    ];

    return (
        <div>
            <h2>Created Elections</h2>
            <ul>
                {elections.map(election => (
                    <li key={election.id}>
                        {election.name} (From: {election.startDate} To: {election.endDate})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ElectionList;