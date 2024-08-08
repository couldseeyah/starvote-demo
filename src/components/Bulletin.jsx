import React from 'react';
import Download from './Download';
import '../App.css';

export default function Bulletin({ total, hashList}) {
  const totalStr = total.toString();
  const totalList = totalStr.replace(/\s/g, '').split('');
  return (
    <>
        <div className="clipboard">
          <div className="clipboard-subheader">
            <h2 style={{color: 'black'}}>Polling Station: XYZ</h2>
          </div>
          <div className='clipboard-page'>
              <h4>Encrypted Votes</h4>
              <ul className="no-bullets large-font-list">
              {hashList.map((item, index) => (
                  <div key={index} className="tally-item">
                  <li>{item.hash}</li>
                  </div>
              ))}
              </ul>
          </div>
        </div>
    </>
  );
}
