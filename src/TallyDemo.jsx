export default function TallyDemo({ setStart, setNext }) {
    return (
        <>
            <p>Tally demo</p>
            <p>(page 2)</p>
            <div className="card">
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => {setNext(false); setStart(true)}}>
                        Back
                    </button>
                    <button onClick={() => {setStart(false); setNext(false)}}>
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    )
}
