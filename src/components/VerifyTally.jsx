import React, { useState } from 'react';
import '../App.css';
import VerificationBox from './VerificationBox';

export default function VerifyTally({total, encryptedVotes, getSum}) {
    const [voteTotal, setTotal] = useState(0)
    const [verifyState, setVerifyState] = useState(false)
    function handleClick(){
        setTotal(getSum(encryptedVotes))
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
                <button className="btn btn-dark" onClick={handleClick}>Verify Total</button>
            </div>
            <div>
                {verifyState && <VerificationBox total={voteTotal}/>}
            </div>
        </div>
    );
}
