import { useState } from 'react'
import './App.css'
import Home from './Home'
import VotingDemo from './VotingDemo'
import TallyDemo from './TallyDemo'

function App() {
  const [start, setStart] = useState(false)
  const [next, setNext] = useState(false)
  const [hashList, setHashList] = useState([]);

  return (
    <>
      {!start ?
        <Home start={start} setStart={setStart} />
        :
        !next ?
          <VotingDemo setStart={setStart} setNext={setNext} hashList={hashList} setHashList={setHashList}/>
        :
          <TallyDemo setStart={setStart} setNext={setNext} hashList={hashList}/>
      }
    </>
  )
}

export default App
