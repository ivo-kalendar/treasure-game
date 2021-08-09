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
    stedyBox,
}) {
    return (
        <div className='levelCompleted'>
            {!stedyBox.length && (
                <button
                    onClick={() => {
                        setMoves(0);
                        setStartOver(false);
                    }}
                    className='play howtoplay'>
                    Start Over!
                </button>
            )}
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
