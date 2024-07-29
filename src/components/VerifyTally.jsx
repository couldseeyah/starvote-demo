import React, { useState } from 'react';
import '../App.css';
import VerificationBox from './VerificationBox';
import Spinner from 'react-bootstrap/Spinner';

export default function VerifyTally({ total }) {

    // const [calculatedVoteTotal, setCalculatedVoteTotal] = useState('0');
    const [verifyState, setVerifyState] = useState(false);
    const [verifiedTotal, setVerifiedTotal] = useState(0)

    function handleClick() {
        setVerifiedTotal(total)
        setVerifyState(true)
    }

    return (
        <div className="text-center">
            <div className="custom-header">
                <h2>Verify Tally</h2>
            </div>
            <div className="flex-grow-1">
                <h4 className="subtitle">To verify the total vote count, click on the button below. </h4>
            </div>
            <div className="button-container">
                <button className="btn btn-dark" onClick={handleClick} disabled={verifyState}>Verify Total</button>
            </div>
            <div>
                {verifyState && <VerificationBox total={verifiedTotal} />}
            </div>
        </div>
    );
}
