import '../App.css';
import QRCode from '../assets/qr_code.svg';

export default function BallotEncryptions({ encryptionList }) {
    return (
        <>
            <div className='ballot-container'>
                <h4>Ballot Receipts</h4>
                <div className='clipboard-container'>
                    {encryptionList.map((encryption, index) => (
                        <div key={index} className='clipboard-item'>
                            <div className='encryption'>{encryption}</div>
                            <div style={{ height: '2rem', width: '2rem' }}>
                                <img src={QRCode} alt="qr code" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
