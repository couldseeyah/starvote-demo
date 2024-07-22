import React, { useState } from 'react';
import '../App.css'

export default function Tally({getSum}) {
    const encryptedVotes = [{symbol: 'xyz', encryption: '12345'}, {symbol: 'abd', encryption: '78901'}, {symbol: 'abd', encryption: '78901'},{symbol: 'abd', encryption: '78901'}]
    const total = getSum(encryptedVotes)

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
                <h3 className='large-font'>Total: {total} RND: 5</h3>
            </div>
        </>
    )
}