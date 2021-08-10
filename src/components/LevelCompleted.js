import { useEffect, useState } from 'react';
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
    level,
    setLevel,
}) {
    const [finished, setFinished] = useState('Done!');

    useEffect(() => {
        let timeout = setTimeout(() => passLevels(), 2000);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [points, keys, stars]);

    //
    //
    //
    const passLevels = () => {
        if (level === 1) levelOne();
        if (level === 2) levelTwo();
        if (level === 3) levelThree();
        console.log(points, stars, keys);
    };

    //
    //
    const levelOne = () => {
        // if (luckyMatch.points > 10) {
        if (points > 1199) {
            setLevel(2);
            setFinished('Level 1 Completed!');
        } else {
            setFinished('Game Over!');
        }
    };

    //
    //
    const levelTwo = () => {
        // if (swapMatch.points > 10) {
        if (stars > 1 && points > 1499) {
            setLevel(3);
            setFinished('Level 2 Completed!');
        } else {
            setFinished('Game Over!');
        }
    };

    //
    //
    const levelThree = () => {
        // if (luckyMatch.points > 10 && swapMatch.points > 10) {
        if (keys > 14 || stars > 2 || points > 1999) {
            setLevel(1);
            setFinished('You Won The Treasure!');
        } else {
            setFinished('Game Over!');
        }
    };

    return (
        <div className='levelCompleted'>
            {!stedyBox.length && finished !== 'Done!' && (
                <button
                    onClick={() => {
                        setMoves(0);
                        setStartOver(false);
                    }}
                    className='play howtoplay'>
                    {finished === 'Game Over!'
                        ? 'Repeat Level!'
                        : finished === 'You Won The Treasure!'
                        ? 'Start Over!'
                        : 'Next Level!'}
                </button>
            )}
            <h1>{finished}</h1>
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
