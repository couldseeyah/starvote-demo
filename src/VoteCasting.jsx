import { Button, Container, Row, Col } from 'react-bootstrap';
import Ballot from './components/Ballot';
import BallotEncryptions from './components/BallotEncryptions';
import Instructions from './components/Instructions';
import { useState, useEffect } from 'react';
import { clearEncryptedObjects } from '../apiService';
import Printer from './components/Printer';
import ballotBoxStyles from './BallotBox.module.css';
import classNames from 'classnames';

export default function VoteCasting({ setNext, hashList, setHashList, options, voterNumber, setIsNumberSelection }) {
    const [currentBallotID, setCurrentBallotID] = useState(1);
    const [showModal, setShowModal] = useState(true);
    const [loadAnimation, setLoadAnimation] = useState(false);

    //printer variables
    const [isAnimating, setIsAnimating] = useState(false);

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
            console.log(document.getElementById("paper").className);
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 4000); // Reset animation after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setLoadAnimation(true);
    }

    return (
        <>
            <Instructions show={showModal} handleClose={handleCloseModal} imageSrc="/cast.png" heading="Voting Guide" />
            {loadAnimation && <>
                <Container>
                    <Button variant="primary" onClick={handleShowModal} style={{ position: 'absolute', top: '3%', left: '3%', width: '10%', backgroundColor: '#587a69', borderColor: '#587a69' }}>
                        Help
                    </Button>
                    <Row>
                        <Col>
                            <div className="animate__animated animate__backInDown">
                                <Printer options={options} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
                            </div>
                        </Col>
                        <Col>
                            receipt here
                        </Col>
                        <Col>
                            <div className={ballotBoxStyles.container}>
                                <div className={ballotBoxStyles.box} id="box">BALLOT BOX</div>
                                <div className={classNames(ballotBoxStyles.paper, {
                                    [ballotBoxStyles.fall]: isAnimating,
                                })} id="paper">VOTE</div>
                            </div>
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
                {/* <Button variant="primary" onClick={handleShowModal} style={{ position: 'absolute', top: '3%', left: '3%', width: '10%', backgroundColor: '#587a69', borderColor: '#587a69' }}>
                    Help
                </Button>

                <div className="row">
                    <div className="column side animate__animated animate__backInDown">
                    <Printer/>
                    </div>
                    <div className="column side animate__animated animate__backInDown animate__delay-1s">
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
                    <button className="btn btn-dark mx-2" onClick={() => setIsNumberSelection(true)}>
                        Back
                    </button>
                    <button className="btn btn-dark mx-2" onClick={() => setNext(true)} disabled={(hashList.length < voterNumber)}>
                        Next
                    </button>
                </div> */}
            </>}
        </>
    );
}
