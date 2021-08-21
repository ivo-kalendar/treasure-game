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
    setPlayGame,
    setTxtIndex,
    language,
}) {
    // State variables //
    const [finished, setFinished] = useState(
        language === 'en' ? 'Done!' : 'Готово!'
    );
    // Basic variables //
    const engPerfect = [
        'PERFECT!!!',
        'YOW WIN 3 STARS!',
        'You are Match Three Master...',
        'Level Completed!!!',
    ];
    const mkdPerfect = [
        'СОВРШЕНО!!!',
        'Вие сте Match Тhree Master...',
        'ОСВОИВТЕ 3 ЗВЕЗДИ!',
        'Успешно Завршено Ниво!!!',
    ];

    //
    //
    // Execute Functions //
    useEffect(() => {
        let interval = setInterval(() => {
            if (stars === 3 && level !== 1) {
                if (language === 'en') {
                    if (finished === engPerfect[0]) setFinished(engPerfect[1]);
                    if (finished === engPerfect[1]) setFinished(engPerfect[2]);
                    if (finished === engPerfect[2]) setFinished(engPerfect[3]);
                    if (finished === engPerfect[3]) setFinished(engPerfect[0]);
                }
                if (language === 'mk') {
                    if (finished === mkdPerfect[0]) setFinished(mkdPerfect[1]);
                    if (finished === mkdPerfect[1]) setFinished(mkdPerfect[2]);
                    if (finished === mkdPerfect[2]) setFinished(mkdPerfect[3]);
                    if (finished === mkdPerfect[3]) setFinished(mkdPerfect[0]);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [level, finished]);

    useEffect(() => {
        let timeout = setTimeout(() => passLevels(), 3000);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [points, keys, stars]);

    //
    //
    // Set Levels //
    const passLevels = () => {
        if (level === 1) levelOne();
        if (level === 2) levelTwo();
        if (level === 3) levelThree();
    };

    //
    //
    // Level One //
    const levelOne = () => {
        // if (luckyMatch.points > 10) {
        if (stars === 3) {
            setLevel(2);
            setFinished(language === 'en' ? 'PERFECT!!!' : 'СОВРШЕНО!!!');
        } else if (points > 1199) {
            setLevel(2);
            setFinished(
                language === 'en' ? 'Level 1 Completed!' : '1во Ниво Завршено!'
            );
        } else {
            setFinished(language === 'en' ? 'Game Over!' : 'Играта Заврши!');
        }
    };

    //
    //
    // Level Two //
    const levelTwo = () => {
        // if (swapMatch.points > 10) {
        if (stars === 3) {
            setLevel(3);
            setFinished(language === 'en' ? 'PERFECT!!!' : 'СОВРШЕНО!!!');
        } else if (stars > 1 && points > 1499) {
            setLevel(3);
            setFinished(
                language === 'en' ? 'Level 2 Completed!' : '2ро Ниво Завршено!'
            );
        } else {
            setFinished(language === 'en' ? 'Game Over!' : 'Играта Заврши!');
        }
    };

    //
    //
    // Level Three //
    const levelThree = () => {
        // if (luckyMatch.points > 10 && swapMatch.points > 10) {
        if (keys > 14 || stars > 2 || points > 1999) {
            setLevel(1);
            setFinished(
                language === 'en'
                    ? 'Congratulations! You Won The Treasure!'
                    : 'Честито! Го Освоивте Богатството!'
            );
        } else {
            setFinished(language === 'en' ? 'Game Over!' : 'Играта Заврши!');
        }
    };

    //
    //
    // Restart on Click //
    const clicked = () => {
        setMoves(0);
        setStartOver(false);
        if (
            finished === 'Congratulations! You Won The Treasure!' ||
            finished === 'Честито! Го Освоивте Богатството!'
        ) {
            setPlayGame(false);
        }

        if (
            finished !== 'Game Over!' &&
            finished !== 'Congratulations! You Won The Treasure!' &&
            finished !== 'Играта Заврши!' &&
            finished !== 'Честито! Го Освоивте Богатството!'
        ) {
            setShowInfoBoard(true);
        }
        setTxtIndex(level);
    };

    return (
        <div className='levelCompleted'>
            {language === 'en' && !stedyBox.length && finished !== 'Done!' && (
                <button onClick={clicked} className='play howtoplay'>
                    {finished === 'Game Over!'
                        ? 'Repeat Level!'
                        : finished === 'Congratulations! You Won The Treasure!'
                        ? 'Start Over!'
                        : 'Next Level!'}
                </button>
            )}

            {language === 'mk' && !stedyBox.length && finished !== 'Готово!' && (
                <button onClick={clicked} className='play howtoplay'>
                    {finished === 'Играта Заврши!'
                        ? 'Пробај Повторно!'
                        : finished === 'Честито! Го Освоивте Богатството!'
                        ? 'Почни Одново!'
                        : 'Следно Ниво!'}
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
                language={language}
            />
        </div>
    );
}
