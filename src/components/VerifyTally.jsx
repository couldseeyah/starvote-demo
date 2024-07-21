import React from 'react';
import '../App.css';

export default function VerifyTally({getSum}) {
    
    return (
        <div className="text-center">
            <h2 className="title">Verify Tallying of Votes</h2>
            <h4 className="subtitle">Click on the 'SUM' button to compute the sum of the encrypted votes</h4>
            <button className="btn btn-dark" onClick={getSum}>SUM</button>
        </div>
    );
}
