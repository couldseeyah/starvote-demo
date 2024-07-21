import React from 'react';
import '../App.css';

export default function GreyDivColumn({ voterNumber }) {
    const columns = [];

    for (let i = 0; i < voterNumber; i += 5) {
        const columnDivs = [];
        for (let j = i; j < i + 5 && j < voterNumber; j++) {
            columnDivs.push(
                <div
                    key={j}
                    style={{
                        position: 'absolute',
                        zIndex: 5 - (j % 5),
                        top: `${(j % 5) * 20}px`,
                        left: `${(j % 5) * 20}px`,
                    }}
                    className="grey-div"
                ></div>
            );
        }
        columns.push(
            <div key={i} className="grey-div-column">
                {columnDivs}
            </div>
        );
    }

    return (
        <div className="grey-divs-container">
            {columns}
        </div>
    );
}
