import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Bulletin from './components/Bulletin';
import Tally from './components/Tally';
import VerifyTally from './components/VerifyTally';
import Instructions from './components/Instructions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { homomorphicAdd } from '../apiService';
import './App.css';


export default function TallyDemo({ setStart, setNext, hashList, options }) {
    const [total, setTotal] = useState(0);
    const [encryptedTotal, setEncryptedTotal] = useState(null)
    const [showModal, setShowModal] = useState(true);
    const [randomness, setRandomness] = useState(null);

    const getSum = async () => {
        try {
            const response = await homomorphicAdd();
            setTotal(response.result)
            const eTotal = (response.encrypted_result).slice(0,16);
            setEncryptedTotal(eTotal)
            setRandomness(response.random)
        } catch (error) {
            console.error("Error fetching homomorphic addition result:", error);
            return null; // Return null or handle the error appropriately
        }
    };


    // useEffect hook to call fetchSum when the component is mounted
    useEffect(() => {
        getSum()
        // fetchSum();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false); 

    return (
        <>
            <Button variant="primary" onClick={handleShowModal} style={{ position: 'fixed', top: '3%', left: '3%', width: '10%', zIndex: 1000, backgroundColor: '#587a69', borderColor: '#587a69' }}>
                Help
            </Button>
            <Instructions show={showModal} handleClose={handleCloseModal} imageSrc="/verify.png" heading="Verification Guide" />
            <h1 className="header">Online ECP Bulletin Board 📌</h1>
            <div className="tally-demo-container">
                <div className="clipboard-container animate__animated animate__backInDown">
                    <Bulletin total={total} hashList={hashList} />
                </div>
                <div className='result-container animate__animated animate__backInDown'>
                    <Tally total={total} options={options} encryptedTotal={encryptedTotal} />
                </div>
                <div className="verify-tally-container animate__animated animate__backInDown animate__delay-1s">
                    <VerifyTally total={total} encryptedTotal={encryptedTotal} randomness={randomness}/>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-1">
                <button className="btn btn-dark mx-2" onClick={() => { setNext(false); setStart(true); }}>
                    Back
                </button>
                <button className="btn btn-dark mx-2" onClick={() => { setStart(false); setNext(false); }}>
                    Back to Home
                </button>
            </div>
        </>
    );
}
