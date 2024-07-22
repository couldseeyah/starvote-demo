import React from 'react';
import '../App.css';

export default function VerifyTally({getSum}) {
    
    return (
        <div className="text-center">
            <div className="custom-header">
                <h2>Verify Tally</h2>
            </div>
            <div className="flex-grow-1">
                <h4 className="subtitle">Click on the 'SUM' button to compute the sum of the encrypted votes</h4>
            </div>
            <div className="button-container">
                <button className="btn btn-dark" onClick={getSum}>SUM</button>
            </div>
        </div>
    );
}
