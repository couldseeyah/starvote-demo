import { Button, Container, Row, Col } from 'react-bootstrap';
import BallotEncryptions from './components/BallotEncryptions';
import Instructions from './components/Instructions';
import { useState, useEffect } from 'react';
import { clearEncryptedObjects } from '../apiService';
import Printer from './components/Printer';
import ballotBoxStyles from './BallotBox.module.css';
import classNames from 'classnames';
import ProgressBar from 'react-bootstrap/ProgressBar';
import VotingCompleteModal from './components/VotingCompleteModal';
import InstructionToast from './components/InstructionToast';

export default function VoteCasting({ setNext, hashList, setHashList, options, voterNumber, setIsNumberSelection }) {
    const [showModal, setShowModal] = useState(true); //instruction modal state
    const [loadAnimation, setLoadAnimation] = useState(false); //used just to initalize animations jo ooper se aate
    const [progressBar, setProgressBar] = useState(0); //for progress bar
    const [loadingShow, setLoadingShow] = useState(false);

    //og ballot variables. change when votes casted
    const [currentBallotID, setCurrentBallotID] = useState(1); //keep track of ballot no. 
    const [vote, setVote] = useState(null); //NOT the real time vote. change when vote casted
    const [encryption, setEncryption] = useState('');
    const [voteTime, setVoteTime] = useState(null);
    const [serialNo, setSerialNo] = useState('');

    //printer variables
    const [isAnimating, setIsAnimating] = useState(false); //for printer animation
    const [isAnimating2, setIsAnimating2] = useState(false); //for second part of animation. ballot box and receipt

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

    useEffect(() => {
        if (isAnimating) {
            console.log('Animation 1 started');

            const timer = setTimeout(() => {
                setIsAnimating(false);
                setIsAnimating2(true);
                // Additional functionality when animation ends
                console.log('Animation 1 has ended');
            }, 3500); // Reset animation after 4 seconds

            // Cleanup timer
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (isAnimating2) {
            console.log('Animation 2 started');
            setCurrentBallotID(currentBallotID + 1);
            const encryptionObject = { symbol: vote.symbol, hash: encryption, time: voteTime };
            setHashList(hashList => [...hashList, encryptionObject]);

            const timer = setTimeout(() => {
                setIsAnimating2(false);
                // Additional functionality when animation ends
                console.log('Animation 2 has ended');
            }, 2500); // Reset animation after 4 seconds

            // Cleanup timer
            return () => clearTimeout(timer);
        }

    }, [isAnimating2]);

    useEffect(() => {
        setProgressBar(((currentBallotID - 1) / voterNumber) * 100);
    }, [currentBallotID]);


    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setLoadAnimation(true);
    }

    return (
        <>
            <Instructions show={showModal} handleClose={handleCloseModal} imageSrc="/cast.png" heading="Voting Guide" />
            {(currentBallotID > voterNumber) && <VotingCompleteModal></VotingCompleteModal>}
            {loadAnimation && <>
                <Container>
                    <Button variant="primary" onClick={handleShowModal} style={{ position: 'absolute', top: '3%', left: '3%', width: '10%', backgroundColor: '#587a69', borderColor: '#587a69' }}>
                        Help
                    </Button>
                    <div style={{ position: 'absolute', top: '3%', right: '5%' }}>
                        <p>Current Vote: {(currentBallotID <= voterNumber) ? currentBallotID : currentBallotID - 1} / {voterNumber} </p>
                    </div>
                    <div style={{ zIndex: '1' }}><h1>Voting in XYZ Polling Station </h1>
                    </div>
                    <Row className="custom-row">
                        <Col>
                            <div className="animate__animated animate__backInDown">
                                <Printer voterNumber={voterNumber} options={options} isAnimating={isAnimating} setIsAnimating={setIsAnimating}
                                    currentBallotID={currentBallotID} setCurrentBallotID={setCurrentBallotID}
                                    vote={vote} setVote={setVote} encryption={encryption} setEncryption={setEncryption}
                                    voteTime={voteTime} setVoteTime={setVoteTime} serialNo={serialNo} setSerialNo={setSerialNo}
                                    setLoadingShow={setLoadingShow}/>
                            </div>

                            {currentBallotID == 1 &&
                                <>
                                    <div style={{ position: 'absolute', top: '65%' }}>
                                        <InstructionToast heading="Cast Vote 🗳️" content="Select a candidate and press the button on the machine to cast your vote!" />
                                    </div>
                                </>
                            }

                        </Col>
                        <Col>
                            {currentBallotID == 2 &&
                                <div style={{ position: 'absolute', top: '20%', zIndex: '5' }}>
                                    <InstructionToast heading="Receipts 🧾" content="Receipts of casted votes. Voter gets to take this receipt home." />
                                </div>
                            }
                            <div className="animate__animated animate__backInDown" style={{ position: 'relative', top: '1%' }}>
                                <BallotEncryptions hashList={hashList}></BallotEncryptions>
                            </div>
                        </Col>
                        <Col>
                            <div className='animate__animated animate__backInDown'>
                                <div className={ballotBoxStyles.container}>
                                    <div className={ballotBoxStyles.boxShadow}></div>
                                    <div className={ballotBoxStyles.box} id="box">BALLOT BOX</div>
                                    <div className={classNames(ballotBoxStyles.paper, {
                                        [ballotBoxStyles.fall]: isAnimating2,
                                    })} id="paper">
                                        {isAnimating2 && <div className={ballotBoxStyles.vote}>
                                            <p><b>VOTE</b>
                                                <br /> {vote?.name}
                                                <br /> {vote?.symbol}
                                                <br /> {serialNo}
                                            </p>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            {currentBallotID == 2 &&
                                <div style={{ position: 'absolute', top: '65%' }}>
                                    <InstructionToast heading="Paper trail 📩" content="Paper votes are collected in a physical ballot box." />
                                </div>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <ProgressBar animated now={progressBar} />;
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <button className="btn btn-dark mx-2" onClick={() => setIsNumberSelection(true)}>
                                Back
                            </button>
                        </Col>
                        <Col>
                            <button className="btn btn-dark mx-2" onClick={() => setNext(true)} disabled={(hashList.length < voterNumber)}>
                                Next
                            </button>
                        </Col>
                    </Row>
                </Container>
            </>}
        </>
    );
}
