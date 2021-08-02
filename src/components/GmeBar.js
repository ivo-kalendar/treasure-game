export default function GameBar({
    points,
    moves,
    keys,
    luckyMatch,
    swapMatch,
}) {
    return (
        <div className='game-bar'>
            <h2 style={{ transform: 'scale(.8,1.5)', fontSize: '4rem' }}>
                <span>{points}</span>
                <span style={{ fontSize: '1rem' }}> pts.</span>
            </h2>
            <h3>Moves: {moves}</h3>
            <h4>Keys: {keys}</h4>
            <h5>
                Lucky Match: {luckyMatch.count}. Lucky Points:{' '}
                {luckyMatch.points}
            </h5>
            <h6>
                Match on Move: {swapMatch.count}. Move Points:{' '}
                {swapMatch.points}
            </h6>
        </div>
    );
}
