import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchVerification } from '../../apiService';
import Spinner from 'react-bootstrap/Spinner';

export default function VerifyTally({ total, encryptedTotal, randomness }) {

    const [reencryptedTotal, setReencryptedTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verifyStart, setVerifyStart] = useState(false);

    const getVerification = async () => {
        try {
            const response = await fetchVerification(total);
            setReencryptedTotal(response.reresult.slice(0, 16));
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
        <div style={{ backgroundColor: '#d0d2d4;', padding: '20px'}} className="text-center">
            <div className="result-subheader">
                <h2>Verify Results</h2>
            </div>
            <div style={{height: '15%'}}></div>
            <div className="flex-grow-1">
                <h6 className="subtitle">To verify the total vote count, click on the button below. </h6>
                <h6>Randomness: {randomness}</h6>
            </div>
            <div className="button-container">
                <button className="btn btn-dark" onClick={handleClick} disabled={reencryptedTotal}>Verify Total</button>
            </div>
            <div>
                {verifyStart && (
                    loading ? <Spinner animation="border" variant="primary" /> :
                        <div className="card-total">
                            <h6>Encrypted Tally: {encryptedTotal}</h6>
                            <h6>Re-encrypted Tally: {reencryptedTotal}</h6>
                        </div>)}
            </div>
            <p><i>The tally results are re-encrypted using the same random factor. The result should be an identical encryption.</i></p>
            {/* <p>The <b>negative</b> of the tally results are encrypted and added to the original encryption. This should give a zero vector.</p> */}
        </div>
    );
}
