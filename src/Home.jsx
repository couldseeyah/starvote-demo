import starIcon from '/wired-flat-237-star-rating.svg';

export default function Home({ start, setStart }) {
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

      <div className="row">
        <div className="column middle" style={{ backgroundColor: "#bbb" }}>
          <div className="card">
            <button className="button-1" onClick={() => setStart(true)}>
              {start ? 'Stop' : 'Start'}
            </button>
          </div>
          <p className="read-the-docs">
            An interactive demo for the STAR voting system.{' '}
          </p>
        </div>
      </div>
    </>
  )
}