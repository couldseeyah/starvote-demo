import Ballot from './components/Ballot';
import VoterNumber from './components/VoterNumber';

export default function VotingDemo({ setStart, setNext }) {
    return (
        <>
            <h1>Voting demo</h1>
            <p>(page 1)</p>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <VoterNumber />
                <div>
                    <p>placeholder slay</p>
                </div>
            </div>
            <div className="card" style={{ marginLeft: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setStart(false)}>
                        Back
                    </button>
                    <button onClick={() => setNext(true)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
