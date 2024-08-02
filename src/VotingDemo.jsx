import { Button } from 'react-bootstrap';
import Ballot from './components/Ballot';
import VoterNumberSelection from './components/VoterNumberSelection';
import BallotEncryptions from './components/BallotEncryptions';
import Instructions from './components/Instructions';
import { useState, useEffect } from 'react';
import { clearEncryptedObjects } from '../apiService';

export default function VotingDemo({ setStart, setNext, hashList, setHashList, options }) {
    const [currentBallotID, setCurrentBallotID] = useState(1);
    const [voterNumber, setVoterNumber] = useState(1);
    const [showModal, setShowModal] = useState(true);
    const [loadAnimation, setLoadAnimation] = useState(false);

    useEffect(() => {
        const fetchDataAndClearHashList = async () => {
            try {
                const result = await clearEncryptedObjects();
            } catch (error) {
                console.error('Error clearing encrypted objects:', error);
            }
            setHashList([]);
        };
        fetchDataAndClearHashList();
    }, []);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setLoadAnimation(true);
    }

    return (
        <>
            <Instructions show={showModal} handleClose={handleCloseModal} imageSrc="/cast.png" heading="Voting Guide" />
            {loadAnimation && <>
                <Button variant="primary" onClick={handleShowModal} style={{ position: 'absolute', top: '3%', left: '3%', width: '10%', backgroundColor: '#587a69', borderColor: '#587a69' }}>
                    Help
                </Button>
                <div className="header">
                    <h1>Voting at Polling Station XYZ</h1>
                </div>

                <div className="row">
                    <div className="column side animate__animated animate__backInDown">
                        <VoterNumberSelection voterNumber={voterNumber}
                            setVoterNumber={setVoterNumber}
                            hashList={hashList} />
                    </div>
                    <div className="column middle animate__animated animate__backInDown animate__delay-1s">
                        <Ballot currentBallotID={currentBallotID}
                            setCurrentBallotID={setCurrentBallotID}
                            setHashList={setHashList}
                            voterNumber={voterNumber} options={options} />
                    </div>
                    <div className="column side animate__animated animate__backInDown animate__delay-2s">
                        <BallotEncryptions hashList={hashList} />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-dark mx-2" onClick={() => setStart(false)}>
                        Back
                    </button>
                    <button className="btn btn-dark mx-2" onClick={() => setNext(true)} disabled={(hashList.length < voterNumber)}>
                        Next
                    </button>
                </div>
            </>}
        </>
    );
}
