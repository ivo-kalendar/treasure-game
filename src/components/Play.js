export default function Play({ setPlayGame, setShowInfoBoard }) {
    return (
        <button
            className='play'
            onClick={() => {
                setPlayGame(true);
                setShowInfoBoard(true);
            }}>
            PLAY
        </button>
    );
}
