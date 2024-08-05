import VoteCasting from './VoteCasting';
import VoterNumberSelection from './components/VoterNumberSelection';
import { useState } from 'react';

export default function VotingDemo({ setStart, setNext, hashList, setHashList, options }) {
    const [voterNumber, setVoterNumber] = useState(1);
    const [isNumberSelection, setIsNumberSelection] = useState(true);

    return (
        <>
            {isNumberSelection ? <>
                <div className="header">
                    <h1>Select Number of Voters</h1>
                </div>
                <div className="row">
                    <div className="column side animate__animated animate__backInDown">
                        <VoterNumberSelection voterNumber={voterNumber}
                            setVoterNumber={setVoterNumber}
                            hashList={hashList} />
                    </div>
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
