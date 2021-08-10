import { useEffect, useState } from 'react';

export default function GameBar({
    points,
    moves,
    keys,
    stars,
    luckyMatch,
    swapMatch,
    level,
}) {
    const [movesLeft, setMovesLeft] = useState(40);

    useEffect(() => {
        setMovesLeft(() => 40 - moves);
        // eslint-disable-next-line
    }, [moves]);

    return (
        <div className='game-bar'>
            <h2>
                <div className='points'>
                    <span>{points}</span>
                    <span style={{ fontSize: '1rem' }}> pts.</span>
                </div>
                <div className='levels'>
                    <span style={{ fontSize: '1.7rem' }}>level: </span>
                    <span>{level}</span>
                </div>
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
