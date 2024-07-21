import React, { useState } from 'react';
import '../App.css';
import Ballot from './Ballot';
import BallotList from './BallotList';

export default function VoterNumber() {
    const [voterNumber, setVoterNumber] = useState('');

    const handleInputChange = (event) => {
        setVoterNumber(event.target.value);
    };

    return (
        <div>
            <div className='voter-container'>
                <label htmlFor="voter-number">Enter Voter Number:</label>
                <input
                    type="number"
                    min="0"
                    max="10"
                    id="voter-number"
                    value={voterNumber}
                    onChange={handleInputChange}
                    placeholder="Voter Number"
                />
                <div>
                    Current Voter Number: {voterNumber}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <BallotList voterNumber={voterNumber-1} />
                <Ballot />
            </div>
        </div>
    );
}
