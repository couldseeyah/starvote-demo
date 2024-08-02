import React, { useState, useEffect } from 'react';
import '../App.css'
import { encryptArray } from '../../apiService';
import Spinner from 'react-bootstrap/Spinner';


export default function Ballot({ currentBallotID, setCurrentBallotID, setHashList, voterNumber, options}) {
    const [vote, setVote] = useState(null);
    const [encryption, setEncryption] = useState('');
    const [loading, setLoading] = useState(false);
    const candidates = options

    const getEncryption = async () => {
        if (vote) {
            try {
                const array = vote.vector;  // Provide the appropriate array data
                const response = await encryptArray(array);
                const receivedEncryption = response.hash;
                if (vote) {
                    setEncryption(receivedEncryption.slice(0,16));
                }
            } catch (error) {
                console.error("Error fetching encryption:", error);
            }
        }
    };

    function castVote() {
        if (voterNumber >= currentBallotID) {
            const encryptionObject = {symbol: vote.symbol, hash: encryption};
            setHashList(hashList => [...hashList, encryptionObject]);
            setCurrentBallotID(currentBallotID + 1);
        }
        if (voterNumber > currentBallotID) {
            setVote(null);
            setEncryption('');
        }
    }

    useEffect(() => {
        const fetchEncryption = async () => {
            setLoading(true);
            await getEncryption();
            setLoading(false);
        };

        fetchEncryption();
    }, [vote]);

    return (
        <>
            <div className='rowcontainer'>
                <div className="ballot-container inner-column">
                    <h3>Ballot</h3>
                    {candidates.map((option, index) => (
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
                            <span>({option.vector.toString()})</span>
                        </div>
                    ))}
                    <div className="selected-vote">
                        Selected Vote: {vote?.name}
                    </div>
                    <h6>Encryption:</h6>
                    <h6 style={{ fontSize: '1em' }}>{loading ? <Spinner animation="border" variant="warning"/> :
                        encryption}</h6>
                    <h6>Ballot ID: {(currentBallotID > voterNumber) ? currentBallotID - 1 : currentBallotID}</h6>
                    <button style={{'border':'1px solid grey' }} onClick={castVote} disabled={!vote}>Cast Vote</button>
                </div>
                <div className='ballot-container inner-column'>
                    <h4 style={{paddingBottom:'20%'}}>Recorded Vote</h4>
                    {vote && <p>{vote?.name + "     " + vote?.symbol}</p>}
                    <h6>Encryption:</h6>
                    <h6 style={{ fontSize: '1em' }}>{loading ? <Spinner animation="border" variant="warning" /> :
                        encryption}</h6>
                    <h6>Ballot ID: {(currentBallotID > voterNumber) ? currentBallotID - 1 : currentBallotID}</h6>
                </div>
            </div>
        </>
    );
}
