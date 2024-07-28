import React, { useState } from 'react';
import '../App.css';
import VerificationBox from './VerificationBox';
import { homomorphicAdd } from '../../apiService';
import Spinner from 'react-bootstrap/Spinner';

export default function VerifyTally({ total }) {

    const [voteTotal, setVoteTotal] = useState('0');
    const [verifyState, setVerifyState] = useState(false);
    const [loading, setLoading] = useState(false);

    const getSum = async () => {
        try {
            const response = await homomorphicAdd(); 
            return response.result;
        } catch (error) {
            console.error("Error fetching homomorphic addition result:", error);
            return null; // Return null or handle the error appropriately
        }
    };

    function handleClick() {
        const fetchSum = async () => {
            setLoading(true);
            const result = await getSum();
            if (result !== null) {
                setVoteTotal(result);
            }
            // setVerifyState(true);
            console.log('result:' + result);
            setLoading(false);
        };

        fetchSum();
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
                {verifyState && <VerificationBox total={voteTotal} />}
            </div>
        </div>
    );
}
