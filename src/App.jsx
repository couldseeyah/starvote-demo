import { useState } from 'react'
import './App.css'
import Home from './Home'
import VotingDemo from './VotingDemo'
import TallyDemo from './TallyDemo'

function App() {
  const [start, setStart] = useState(false)
  const [next, setNext] = useState(false)
  const [encryptedVotes, setEncryptedVotes] = useState([]);

  // const newEncryptedVote = {
//     hash,
//     encryption: encrypted_array // Assuming encrypted_array is an Encrypted Object
// };

// setEncryptedVotes((prevVotes) => {
//     if (prevVotes.length === 0) {
//         // If no previous votes, simply add the new vote
//         return [newEncryptedVote];
//     } else {
//         // If there are existing votes, append the new one
//         return [...prevVotes, newEncryptedVote];
//     }
// });
  
  return (
    <>
      {!start ?
        <Home start={start} setStart={setStart} />
        :
        !next ?
          <VotingDemo setStart={setStart} setNext={setNext} setEncryptedArray={setEncryptedArray}/>
        :
          <TallyDemo setStart={setStart} setNext={setNext}/>
      }
    </>
  )
}

export default App
