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
    setShowInfoBoard,
}) {
    const [finished, setFinished] = useState('Done!');

    useEffect(() => {
        let timeout = setTimeout(() => passLevels(), 3000);
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
        if (keys > 14 || stars > 3 || points > 1999) {
            setLevel(1);
            setFinished('You Won The Treasure!');
        } else {
            setFinished('Game Over!');
        }
    };

    const clicked = () => {
        setMoves(0);
        setStartOver(false);
        if (finished !== 'Game Over!') setShowInfoBoard(true);
    };

    return (
        <div className='levelCompleted'>
            {!stedyBox.length && finished !== 'Done!' && (
                <button onClick={clicked} className='play howtoplay'>
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
