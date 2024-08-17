import VoteCasting from './VoteCasting';
import VoterNumberSelection from './components/VoterNumberSelection';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function VotingDemo({ setStart, setNext, hashList, setHashList, options }) {
    const [voterNumber, setVoterNumber] = useState(1);
    const [isNumberSelection, setIsNumberSelection] = useState(true);

    return (
        <>
            {isNumberSelection ? <>
                <div style={{ border: '2px solid #aaa', borderRadius: '2rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} className="animate__animated animate__backInDown">
                    <Container>
                        <Row>
                            <Col><h1 style={{padding: '2%'}}> Start your Election! </h1>
                                <h2> Choose Number of Voters </h2></Col>
                        </Row>
                        <Row>
                            <Col>
                                <VoterNumberSelection voterNumber={voterNumber}
                                    setVoterNumber={setVoterNumber}
                                    hashList={hashList} />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-dark mx-2" onClick={() => setStart(false)}>
                        Back
                    </button>
                    <button className="btn btn-dark mx-2" onClick={() => setIsNumberSelection(false)}>
                        Next
                    </button>
                </div>
            </> :
                <VoteCasting setNext={setNext} hashList={hashList} setHashList={setHashList} options={options} voterNumber={voterNumber} setIsNumberSelection={setIsNumberSelection}></VoteCasting>}
        </>
    );
}
