import starIcon from '/wired-flat-237-star-rating.svg';
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
          <a href="https://www.starvoting.org/star" target="_blank">
            <img src={starIcon} className="logo react" alt="logo" />
          </a>
        </div>
        <h1>STAR Vote</h1>
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