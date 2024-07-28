import React, { useState } from 'react';
import '../App.css'


export default function Tally({total, hashList}) {

    return (
        <>  
           <div className="custom-header">
                <h2>Polling Station: XYZ</h2>
            </div>
            <h4 style={{marginBottom: '3%', marginTop: '2%'}}>Encrypted Votes</h4>
            <ul className='no-bullets large-font-list'>
                {hashList.map((item, index) => (
                    <div class='tally-item'>
                        <li key={index}>{item.symbol + "   " + item.hash}</li>
                    </div> 
                ))}
            </ul>
            <div className="custom-header">
                <h2>Vote Tally</h2>
            </div>
            <div className="custom-footer">
                <h3 className='large-font' style={{marginTop: '2%'}}>Total: {total} RND: 5</h3>
            </div>
        </>
    )
}