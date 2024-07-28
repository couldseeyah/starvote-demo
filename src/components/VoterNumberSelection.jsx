import React, { useState } from 'react';
import '../App.css';
import BallotList from './BallotList';

export default function VoterNumberSelection({voterNumber, setVoterNumber, hashList}) {

    const handleInputChange = (event) => {
        if (hashList.length > 0){
            alert('You cannot change the number of voters after voting has started.');
            return;
        }
        setVoterNumber(event.target.value);
    };

    return (
        <div>
            <div className='voter-container'>
                <label htmlFor="voter-number">Enter Voter Number:</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    id="voter-number"
                    value={voterNumber}
                    onChange={handleInputChange}
                    placeholder="1"
                />
                <div>
                    Number of Voters: {voterNumber}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <BallotList voterNumber={voterNumber} />
            </div>
        </div>
    );
}
