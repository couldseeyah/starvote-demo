import React, { useState, useEffect } from 'react';
import '../Printer.css';

export default function Printer({options, isAnimating, setIsAnimating}) {

    const [selectedContent, setSelectedContent] = useState('');

    const handlePrint = () => {
        isAnimating ? setIsAnimating(false) : setIsAnimating(true);
    }

    return (
        <>
            <div id="printer-animation" className={`printer-animation ${isAnimating ? 'animating' : ''}`}>
                <div className="printer">
                    <input id="button" type="checkbox" checked={isAnimating} readOnly />
                    <label className="button" htmlFor="button" onClick={handlePrint}></label>
                    <div className="top"></div>
                    <div className="middle">
                        <p style={{ color: 'aliceblue' }}>Choose content:</p>
                        <div>
                            <input
                                type="radio"
                                id="option1"
                                name="content"
                                value="Content 1"
                                onChange={(e) => setSelectedContent(e.target.value)}
                            />
                            <label htmlFor="option1" style={{ color: 'aliceblue' }}>Content 1</label><br />
                            <input
                                type="radio"
                                id="option2"
                                name="content"
                                value="Content 2"
                                onChange={(e) => setSelectedContent(e.target.value)}
                            />
                            <label htmlFor="option2" style={{ color: 'aliceblue' }}>Content 2</label><br />
                            <input
                                type="radio"
                                id="option3"
                                name="content"
                                value="Content 3"
                                onChange={(e) => setSelectedContent(e.target.value)}
                            />
                            <label htmlFor="option3" style={{ color: 'aliceblue' }}>Content 3</label>
                        </div>
                    </div>
                    <div className="trace"></div>
                    <div className="paper one">{selectedContent}</div>
                    <div className="paper two">secondpaper</div>
                </div>
            </div>
        </>
    )

};


