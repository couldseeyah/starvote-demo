import React, { useState, useEffect } from 'react';
import Tally from './components/Tally';
import VerifyTally from './components/VerifyTally';
import 'bootstrap/dist/css/bootstrap.min.css';
import { homomorphicAdd } from '../apiService';
import './App.css';


export default function TallyDemo({ setStart, setNext, hashList, options}) {
    const [calculatedVoteTotal, setCalculatedVoteTotal] = useState(0);
    
    const getSum = async () => {
        try {
            const response = await homomorphicAdd(); 
            return response;
        } catch (error) {
            console.error("Error fetching homomorphic addition result:", error);
            return null; // Return null or handle the error appropriately
        }
    };

    const fetchSum = async () => {
        const result = await getSum();
        if (result !== null) {
            setCalculatedVoteTotal(result);
            console.log(typeof(calculatedVoteTotal))
        }
    };

    // useEffect hook to call fetchSum when the component is mounted
    useEffect(() => {
        console.log("Fetch sum called")
        fetchSum();
        console.log("Vote total: ", calculatedVoteTotal)
    }, []); 

    return (
        <>
        <h1 className="text-center mt-1">ECP Bulletin Board</h1>
        <div className="tally-demo-container">
            <div className="custom-card">
                <Tally total={calculatedVoteTotal} hashList={hashList} options={options}/>
            </div>
            <div className="custom-card-right">
                <VerifyTally total={calculatedVoteTotal} hashList = {hashList}/>
            </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
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
