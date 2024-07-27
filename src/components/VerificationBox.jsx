import React, { useState } from 'react';
import '../App.css';

export default function VerificationBox({total}) {
    
    return (
        <div className="card-total">
            <h4>Total: {total}</h4>
        </div>
    );
}
