import React, { useState } from 'react';
import '../App.css'

export default function Ballot() {
    const [vote, setVote] = useState(null);

    const options = [
        { name: 'Candidate 1', symbol: '🔴', vector: '100' },
        { name: 'Candidate 2', symbol: '🟢', vector: '010' },
        { name: 'Candidate 3', symbol: '🔵', vector: '001' },
    ];

    return (
        <div className="ballot-container">
            <p>Ballot</p>
            {options.map((option, index) => (
                <div key={index} className="ballot-option">
                    <input
                        type="radio"
                        name="vote"
                        value={option.name}
                        onChange={() => setVote(option.name)}
                        checked={vote === option.name}
                    />
                    <span>{option.symbol}</span>
                    <span>{option.name}</span>
                    <span>({option.vector})</span>
                </div>
            ))}
            <div className="selected-vote">
                Selected Vote: {vote}
            </div>
        </div>
    );
}
