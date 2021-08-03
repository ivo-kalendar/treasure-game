import GameBar from './GmeBar';

export default function LevelCompleted({
    points,
    moves,
    keys,
    stars,
    luckyMatch,
    swapMatch,
    setMoves,
    setStartOver,
}) {
    return (
        <div className='levelCompleted'>
            <button
                onClick={() => {
                    setMoves(0);
                    setStartOver(false);
                }}
                className='play howtoplay'>
                Start Over!
            </button>
            <h1>Level Completed!</h1>
            <GameBar
                points={points}
                moves={moves}
                keys={keys}
                stars={stars}
                luckyMatch={luckyMatch}
                swapMatch={swapMatch}
            />
        </div>
    );
}
