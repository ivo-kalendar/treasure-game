import { useEffect, useState } from 'react';

export default function GameBar({
    points,
    moves,
    keys,
    stars,
    luckyMatch,
    swapMatch,
}) {
    const [movesLeft, setMovesLeft] = useState(40);

    useEffect(() => {
        setMovesLeft(() => 40 - moves);
        // eslint-disable-next-line
    }, [moves]);

    return (
        <div className='game-bar'>
            <h2 style={{ transform: 'scale(.8,1.5)', fontSize: '4rem' }}>
                <span>{points}</span>
                <span style={{ fontSize: '1rem' }}> pts.</span>
            </h2>
            <h3 className='no-need'>Remaining Moves: {movesLeft}</h3>
            <h4>
                Keys: {keys}. Stars: {stars}
            </h4>
            <h5>
                <span className='no-need'>
                    Lucky Match: {luckyMatch.count}. Moves: {swapMatch.count}.
                </span>{' '}
                Lucky Points: {luckyMatch.points}. Move Points:{' '}
                {swapMatch.points}.
            </h5>
        </div>
    );
}
