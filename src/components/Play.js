export default function Play({ setPlayGame }) {
    return (
        <button className='play' onClick={() => setPlayGame(true)}>
            PLAY
        </button>
    );
}
