import starIcon from '/green-star.svg';
import { useEffect } from 'react';
import { clearEncryptedObjects } from '../apiService';
import 'animate.css';

export default function Home({ start, setStart }) {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await clearEncryptedObjects();
      } catch (error) {
        console.error('Error clearing encrypted objects:', error);
      }
    };
      fetchData();
    }, []);

  return (
    <div style={{border:'2px solid #aaa', borderRadius:'2rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'}} className="animate__animated animate__backInDown">
      <div className="header">
        <div>
          <a href="https://www.researchgate.net/publication/256082508_STAR-Vote_A_Secure_Transparent_Auditable_and_Reliable_Voting_System_Volume_1_18-37" target="_blank">
            <img style={{ width: '20%', height: '20%' }} src={starIcon} className="logo react" alt="logo" />
          </a>
        </div>
        <h1>STAR-Vote</h1>
      </div>

      <div className="row-home">
        <div className="inner-column">
          <div className="card" style={{margin: "auto"}}>
            <button className="button-1" onClick={() => setStart(true)}>
              {start ? 'Stop' : 'Start'}
            </button>
          </div>
          <p className="read-the-docs" style={{margin: "2%"}}>
            An interactive demo for the STAR voting system.{' '}
          </p>
        </div>
      </div>
    </div>
  )
}