import React, { useState } from 'react';
import '../App.css';

export default function VerificationBox({total}) {
    
    return (
        <div className="card">
            <h4>Total: {total}</h4>
        </div>
    );
}
