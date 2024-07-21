import React, { useState } from 'react';
import '../App.css'

export default function Tally({getSum}) {
    const encryptedVotes = [{symbol: 'xyz', encryption: '12345'}, {symbol: 'abd', encryption: '78901'}, {symbol: 'abd', encryption: '78901'},{symbol: 'abd', encryption: '78901'}]
    const total = getSum(encryptedVotes)

    return (
        <>
            <h2>Polling Station: XYZ</h2>
            <ul className='no-bullets'>
                {encryptedVotes.map((vote, index) => ( 
                    <li key={index}>{vote.encryption}</li>
                ))}     
            </ul>
            <h3>Total: {total} RND: 5</h3>
        </>
    )
}