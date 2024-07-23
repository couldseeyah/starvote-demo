import React, { useState } from 'react';
import '../App.css'


export default function Tally({total, encryptedVotes}) {
    const voteTotal = total;

    return (
        <>  
           <div className="custom-header">
                <h2>Polling Station: XYZ</h2>
            </div>
            <ul className='no-bullets large-font-list'>
                {encryptedVotes.map((vote, index) => (
                    <li key={index}>{vote.encryption}</li>
                ))}
            </ul>
            <div className="custom-header">
                <h2>Vote Tally</h2>
            </div>
            <div className="custom-footer">
                <h3 className='large-font'>Total: {voteTotal} RND: 5</h3>
            </div>
        </>
    )
}