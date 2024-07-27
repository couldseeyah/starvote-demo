import Ballot from './components/Ballot';
import VoterNumberSelection from './components/VoterNumberSelection';
import BallotEncryptions from './components/BallotEncryptions';
import { useState, useEffect } from 'react';

export default function VotingDemo({ setStart, setNext, hashList, setHashList }) {
    const [currentBallotID, setCurrentBallotID] = useState(1);
    const [voterNumber, setVoterNumber] = useState(1);

    useEffect
        (() => {
            setHashList([]);
        }, []);

    return (
        <>
            <div className="header">
                <h1>Voting Demo</h1>
            </div>

            <div className="row">
                <div className="column side" style={{ backgroundColor: "#aaa;" }}>
                    <VoterNumberSelection voterNumber={voterNumber}
                        setVoterNumber={setVoterNumber}
                        hashList={hashList} />
                </div>
                <div className="column middle" style={{ backgroundColor: "#bbb;" }}>
                    <Ballot currentBallotID={currentBallotID}
                        setCurrentBallotID={setCurrentBallotID}
                        setHashList={setHashList}
                        voterNumber={voterNumber} />
                </div>
                <div className="column side" style={{ backgroundColor: "#ccc;" }}>
                    <BallotEncryptions hashList={hashList} />
                </div>
            </div>

            <div className="footer">
                <div className="card" style={{ marginLeft: '2rem', gap: '1rem', display: 'flex', justifyContent: 'space-evenly' }}>
                    <button onClick={() => setStart(false)}>
                        Back
                    </button>
                    <button onClick={() => setNext(true)} disabled={(encryptionList.length < voterNumber)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
