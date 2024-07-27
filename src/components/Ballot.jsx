import React, { useState, useEffect } from 'react';
import { encryptArray, homomorphicAdd } from './apiService';
import '../App.css'


export default function Ballot({ currentBallotID, setCurrentBallotID, setEncryptionList, voterNumber }) {
    const [vote, setVote] = useState(null);
    const [encryption, setEncryption] = useState('');

    const options = [
        { name: 'Tom', symbol: '🐤', vector: '100' },
        { name: 'Mary', symbol: '☂️', vector: '010' },
        { name: 'Sue', symbol: '✂️', vector: '001' },
    ];

    function getEncryption() {
        let encryption = "";
        for (let i = 0; i < 7; i++) {
            let slay = Math.floor(Math.random() * (15 - 0 + 1));
            let hexString = slay.toString(16);
            encryption = encryption + hexString
        }
        vote && setEncryption(encryption)
    }

    function castVote() {
        if (voterNumber >= currentBallotID) {
            setEncryptionList(encryptionList => [...encryptionList, encryption]);
            setCurrentBallotID(currentBallotID + 1);
        }
        if (voterNumber > currentBallotID) {
            setVote(null);
            setEncryption('');
        }
    }

    useEffect(() => {
        getEncryption();
    }, [vote]);

    return (
        <>
            <div className='rowcontainer'>
                <div className="ballot-container column side">
                    <h3>Ballot</h3>
                    {options.map((option, index) => (
                        <div key={index} className="ballot-option">
                            <input
                                type="radio"
                                name="vote"
                                value={option.name}
                                disabled={currentBallotID > voterNumber}
                                onChange={() => setVote(option)}
                                checked={vote?.name === option.name}
                            />
                            <span>{option.name}</span>
                            <span>{option.symbol}</span>
                            <span>({option.vector})</span>
                        </div>
                    ))}
                    <div className="selected-vote">
                        Selected Vote: {vote?.name}
                    </div>
                    <h6>Encryption: {encryption}</h6>
                    <h6>Ballot ID: {(currentBallotID > voterNumber) ? currentBallotID - 1 : currentBallotID}</h6>
                    <button onClick={castVote} disabled={!vote}>Cast Vote</button>
                </div>
                <div className='ballot-container column side'>
                    <h4>Recorded Vote</h4>
                    {vote && <p>{vote?.name + "     " + vote?.symbol}</p>}
                    <h6>Encryption: {encryption}</h6>
                    <h6>Ballot ID: {(currentBallotID > voterNumber) ? currentBallotID - 1 : currentBallotID}</h6>
                </div>
            </div>
        </>
    );
}
