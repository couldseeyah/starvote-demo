import React, { useState } from 'react';
import '../App.css';

export default function VoterNumberSelection({ voterNumber, setVoterNumber, hashList }) {

    const handleInputChange = (event) => {
        setVoterNumber(event.target.value);
    };

    return (
        <div>
            <div className='voter-container'>
                <label htmlFor="voter-number"><h4>Voter Number: &nbsp; </h4></label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    id="voter-number"
                    value={voterNumber}
                    onChange={handleInputChange}
                    placeholder="1"
                    style={{ fontSize: '1em', padding: '8px', width: '75px' }}
                />
            </div>
                <div>
                    {Array.from({ length: voterNumber }, (_, index) => (
                        <span key={index} role="img" aria-label="voter" style={{fontSize: '3em'}}>👤</span>
                    ))}
                </div>
        </div>
    );
}
