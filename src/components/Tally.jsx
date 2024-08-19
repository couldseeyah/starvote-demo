import React from 'react';
import Download from './Download';
import '../App.css';

export default function Tally({ total, options, encryptedTotal }) {
  
  const totalStr = total.toString();
  const totalList = totalStr.split(',').map(Number);
  return (
    <>
      <div className="result">
        <div className="result-subheader">
          <h2>RESULTS</h2>
        </div>
        <h5 style={{ marginTop: '5%' }}>Total Votes (Encrypted): {encryptedTotal}</h5>
        <h5 style={{ marginTop: '2%' }}>Total Votes (Vector): {total}</h5>
        <div className="total-votes-container">
          <h4>Total Votes by Candidate:</h4>
          {options.map((option, index) => (
            <div key={index} className="tally-item">
              <span className="large-font-list">{option.symbol + "  " + option.name + ':    '}</span>
              <span className="large-font-list">{totalList[index]}</span>
            </div>
          ))}
        </div>
        <Download />
      </div>
    </>
  );
}
