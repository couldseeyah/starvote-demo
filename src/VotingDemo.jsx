export default function VotingDemo({ setStart, setNext }) {
    return (
        <>
            <p>Voting demo</p>
            <p>(page 1)</p>
            <div className="card">
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
    )
}