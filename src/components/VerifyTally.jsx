import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchVerification } from '../../apiService';
import Spinner from 'react-bootstrap/Spinner';

export default function VerifyTally({ total, encryptedTotal }) {

    const [reencryptedTotal, setReencryptedTotal] = useState(null)
    const [difference, setDifference] = useState(null)
    const [loading, setLoading] = useState(false)
    const [verifyStart, setVerifyStart] = useState(false)

    const getVerification = async () => {
        try {
            const response = await fetchVerification(total);
            setReencryptedTotal(response.hash.slice(0, 16))
            setDifference(response.reresult)
        }
        catch (error) {
            console.error("Error fetching verification:", error);
            return null;
        }
    }

    function handleClick() {
        setVerifyStart(true);
    }

    useEffect(() => {
        const startVerification = async () => {
            setLoading(true);
            await getVerification();
            setLoading(false);
        };

        startVerification();
    }, [verifyStart]);


    return (
        <div className="text-center">
            <div className="custom-header">
                <h2>Verify Tally</h2>
            </div>
            <div className="flex-grow-1">
                <h6 className="subtitle">To verify the total vote count, click on the button below. </h6>
            </div>
            <div className="button-container">
                <button className="btn btn-dark" onClick={handleClick} disabled={difference}>Verify Total</button>
            </div>
            <div>
                {verifyStart && (
                    loading ? <Spinner animation="border" variant="warning" /> :
                    <div className="card-total">
                        <h6>Encrypted Tally: {encryptedTotal}</h6>
                        <h6>Re-encrypted Tally: {reencryptedTotal}</h6>
                        <h6>Difference: {difference}</h6>
                    </div>)}
            </div>
            <p><i>The tally results are re-encrypted and <b>subtracted</b> from the original encrypted tally. The result should be a zero vector if both of these encryptions correspond to the same tally.</i></p>
            {/* <p>The <b>negative</b> of the tally results are encrypted and added to the original encryption. This should give a zero vector.</p> */}
        </div>
    );
}
