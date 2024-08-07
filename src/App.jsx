import { useState } from 'react'
import './App.css'
import Home from './Home'
import VotingDemo from './VotingDemo'
import TallyDemo from './TallyDemo'

function App() {
  const [start, setStart] = useState(false);
  const [next, setNext] = useState(false);
  const [hashList, setHashList] = useState([]);

  const options = [
    { name: 'Socialist', symbol: '⚖️', vector: [1, 0, 0] },
    { name: 'Marxist', symbol: '🔨 ', vector: [0, 1, 0] },
    { name: 'Anarchist', symbol: '🏛️', vector: [0, 0, 1] },
  
  ];

  return (
    <>
      {!start ?
        <Home start={start} setStart={setStart} />
        :
        !next ?
          <VotingDemo setStart={setStart} setNext={setNext} hashList={hashList} setHashList={setHashList} options = {options}/>
        :
          <TallyDemo setStart={setStart} setNext={setNext} hashList={hashList} options={options}/>
      }
    </>
  )
}

export default App
