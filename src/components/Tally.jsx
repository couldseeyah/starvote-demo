import React, { useState, useEffect } from 'react';
import Download from './Download';
import '../App.css'


export default function Tally({total, hashList, options, encryptedTotal}) {
    const totalStr = total.toString();
    const totalList = totalStr.replace(/\s/g, '').split('');
    return (
        <>  
        <div className='flex-container'>
            <div className='column large'>
                <div className="custom-header">
                    <h2>Polling Station: XYZ</h2>
                </div>
                <h4 style={{marginBottom: '3%', marginTop: '2%'}}>Encrypted Votes</h4>
                <ul className='no-bullets large-font-list'>
                    {hashList.map((item, index) => (
                        <div key={index} className='tally-item'>
                            <li>{item.hash}</li>
                        </div> 
                    ))}
                </ul>
            </div>
            <div className='column small'>
                <div className="custom-header">
                    <h2>Vote Tally</h2>
                </div>
                <div>
                    <h4 style={{marginTop: '2%'}}>Total Votes (Encrypted): {encryptedTotal}</h4>
                    <h4 style={{marginTop: '2%'}}>Total Votes (Vector): {total}</h4>
                    <h4 style={{marginTop: '2%'}}>Total Votes by Candidate:</h4>
                    {options.map((option, index) => (
                            <div key={index} className="tally-item">
                                <span className='large-font-list'>{option.symbol + "  " + option.name + ':    '}</span>
                                <span className='large-font-list'>{totalList[index]}</span>
                            </div>
                        ))}
                </div>
                <Download></Download>
            </div>
        </div>
     </>
    )
}