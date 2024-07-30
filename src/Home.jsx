import starIcon from '/wired-flat-237-star-rating.svg';
import { useEffect } from 'react';
import { clearEncryptedObjects } from '../apiService';

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
    <>
      <div className="header">
        <div>
          <a href="https://www.starvoting.org/star" target="_blank">
            <img src={starIcon} className="logo react" alt="logo" />
          </a>
        </div>
        <h1>STAR Vote</h1>
      </div>

      <div className="row-home">
        <div className="column middle">
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
    </>
  )
}