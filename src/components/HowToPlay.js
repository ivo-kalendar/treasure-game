export default function HowToPlay({ setShowInfoBoard }) {
    return (
        <button
            onClick={() => setShowInfoBoard(true)}
            style={{
                bottom: window.innerHeight / 1.1,
            }}
            className='play howtoplay'>
            Како Се Игра?
        </button>
    );
}
