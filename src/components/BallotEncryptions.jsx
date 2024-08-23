import '../App.css';
import QRCode from '../assets/qr_code.svg';

export default function BallotEncryptions({ hashList }) {
    return (
        <>
            {/* <div className='ballot-container'>
                <h4>Receipts</h4>
                <div className='clipboard-container'>
                    {hashList.map((item, index) => (
                        <div key={index} className='clipboard-item'>
                            <div className='encryption'>{item.hash}</div>
                            <div style={{ height: '2rem', width: '2rem' }}>
                                <img src={QRCode} alt="qr code" />
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="receipt-container">
                <h4>Receipts</h4>
                <div className="hash-grid">
                    {hashList.map((item, index) => (
                        <div key={index} className="hash-item animate__animated animate__bounceIn">
                            <h6 style={{fontSize: '10px'}}>RECEIPT</h6>
                            <p style={{margin: '5%'}}>Ballot Code: {" "+item.hash}<br/>{item.time}</p>
                            <div style={{ height: '2rem', width: '2rem'}}>
                                <img src={QRCode} alt="qr code" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
