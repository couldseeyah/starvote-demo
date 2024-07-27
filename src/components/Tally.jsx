import React, { useState } from 'react';
import '../App.css'


export default function Tally({total, encryptedVotes}) {
    const voteTotal = total;

    return (
        <>  
           <div className="custom-header">
                <h2>Polling Station: XYZ</h2>
            </div>
            <h4 style={{marginBottom: '3%', marginTop: '2%'}}>Encrypted Votes</h4>
            <ul className='no-bullets large-font-list'>
                {encryptedVotes.map((vote, index) => (
                    <div class='tally-item'>
                        <li key={index}>{vote.encryption}</li>
                    </div> 
                ))}
            </ul>
            <div className="custom-header">
                <h2>Vote Tally</h2>
            </div>
            <div className="custom-footer">
                <h3 className='large-font' style={{marginTop: '2%'}}>Total: {voteTotal} RND: 5</h3>
            </div>
        </>
    )
}