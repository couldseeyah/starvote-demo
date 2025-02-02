import React, { useState } from 'react';
import '../App.css';
import { downloadZip } from '../../apiService';

export default function Download() {

    const handleDownload = async () => {
        try {
            const blob = await downloadZip();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'files.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download error:', err);
        }
    }

    return (
        <div className="text-center">
            <div className="flex-grow-1">
                <p className="subtitle">You may verify the sum of encrypted votes by downloading the encrypted votes data. </p>
            </div>
            <div className="button-container">
                <button className="btn btn-dark" onClick={handleDownload}>Download</button>
            </div>
            {/* <div>
                {verifyState && <VerificationBox total={verifiedTotal} />}
            </div> */}
        </div>
    );
}
