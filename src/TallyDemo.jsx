import React from 'react';
import Tally from './components/Tally';
import VerifyTally from './components/VerifyTally';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function getSum(encryptedVotes){
    let sum = 0;
    for (let vote of encryptedVotes){
        sum += parseInt(vote.encryption, 10);
    }
    return sum;
}

export default function TallyDemo({ setStart, setNext }) {

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-2">ECP Bulletin Board</h1>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <div className="card custom-card p-3">
                        <Tally getSum={getSum} />
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card custom-card p-3">
                        <VerifyTally getSum={getSum}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-dark mx-2" onClick={() => { setNext(false); setStart(true); }}>
                    Back
                </button>
                <button className="btn btn-dark mx-2" onClick={() => { setStart(false); setNext(false); }}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}
