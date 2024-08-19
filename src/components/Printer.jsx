import React, { useState } from 'react';
import '../Printer.css';
import { encryptArray } from '../../apiService';
import QRCode from '../assets/qr_code.svg';
import Spinner from 'react-bootstrap/Spinner';

export default function Printer({ voterNumber, setLoadingPrint, options, isAnimating, setIsAnimating, currentBallotID, setCurrentBallotID, vote, setVote, encryption, setEncryption, voteTime, setVoteTime, serialNo, setSerialNo }) {

    const [currentVote, setCurrentVote] = useState(null);

    const generateSerialNumber = () => {
        // Generate a random 6-digit serial number
        return Math.floor(100000 + Math.random() * 900000);
    }

    const getCurrentDateTime = () => {
        const now = new Date();

        // Extract date components
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year

        // Extract time components
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Format and return the date/time string
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }

    const getEncryption = async () => {
        if (currentVote) {
            try {
                const array = currentVote.vector;
                const response = await encryptArray(array);
                const receivedEncryption = response.hash;
                const shortCode = receivedEncryption.slice(0, 16);
                return shortCode;
            }
            catch (error) {
                console.error("Error fetching encryption:", error);
            }
        }
    };

    const handlePrint = async () => {        
        //setvariables

        setLoadingPrint(true);
        setVote(currentVote);
        setVoteTime(getCurrentDateTime());
        setSerialNo(generateSerialNumber());
        const encryptionResult = await getEncryption();
        setEncryption(encryptionResult);
        setCurrentVote(null);

        isAnimating ? setIsAnimating(false) : setIsAnimating(true);
    }

    return (
        <>
            <div id="printer-animation" className={`printer-animation ${isAnimating ? 'animating' : ''}`}>
                <div className="printer">
                    <input id="button" type="checkbox" checked={isAnimating} disabled={(voterNumber < currentBallotID) || isAnimating} readOnly />
                    <label className="button" htmlFor="button" onClick={handlePrint}></label>
                    <div className="top"></div>
                    <div className="middle">
                        <div style={{ justifyContent: 'center', padding: '5%' }}>
                            <p style={{ color: 'aliceblue' }}>Choose candidate:</p>
                            <div style={{ color: 'aliceblue' }}>
                                {options.map((option, index) => (
                                    <div>
                                        <input
                                            type='radio'
                                            name='vote'
                                            id={option.name}
                                            value={option.name}
                                            disabled={currentBallotID > voterNumber}
                                            onChange={() => setCurrentVote(option)}
                                            checked={currentVote?.name === option.name}
                                        />
                                        <label htmlFor={option.name} style={{ color: 'aliceblue' }}>
                                        {"\u00A0\u00A0\u00A0" + option.name} <span style={{ fontSize: '28px' }}>{option.symbol}</span>
                                        </label><br />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="trace"></div>
                    <div className="paper one" >
                        {isAnimating && <>
                            <h6>VOTE</h6>
                            <p><b>{vote?.name}</b></p>
                            <p style={{ fontSize: '1.5rem' }}>{vote?.symbol}</p>
                            <p>Serial number: {serialNo}</p>
                        </>}
                    </div>
                    <div className="paper two">
                        {isAnimating && <>
                            <h6>RECEIPT</h6>
                            <p>Ballot Code: {" " + encryption}</p>
                            <p>{voteTime}</p>
                            <div style={{ height: '2rem', width: '2rem' }}>
                                <img src={QRCode} alt="qr code" />
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )

};


