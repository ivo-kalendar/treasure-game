import { useEffect, useState } from 'react';
// import key from '../layout/key.png';GiKey
import { FaKey } from 'react-icons/fa';
import Stars from './Stars';

export default function GameBar({
    points,
    moves,
    keys,
    stars,
    luckyMatch,
    swapMatch,
    level,
    language,
}) {
    // State variables //
    const [movesLeft, setMovesLeft] = useState(40);

    //
    //
    // Execute Functions //
    useEffect(() => {
        setMovesLeft(() => 40 - moves);
        // eslint-disable-next-line
    }, [moves]);

    //
    //
    // Styles //
    const movesColor =
        movesLeft > 15 ? 'green' : movesLeft > 5 ? 'yellow' : 'red';
    const keysColor = keys > 14 ? 'green' : keys > 5 ? 'yellow' : 'red';
    const luckyColor =
        luckyMatch.points > 99
            ? 'green'
            : luckyMatch.points > 79
            ? 'yellow'
            : 'red';
    const matchColor =
        swapMatch.points > 99
            ? 'green'
            : swapMatch.points > 79
            ? 'yellow'
            : 'red';

    return (
        <div className='game-bar'>
            <h2>
                <div className='points'>
                    <span>{points}</span>
                    <span style={{ fontSize: '1rem' }}>
                        {language === 'en' ? ' pts.' : ' пое.'}
                    </span>
                </div>
                <div className='levels'>
                    <span style={{ fontSize: '1rem' }}>
                        {language === 'en' ? 'level: ' : 'лев: '}
                    </span>
                    <span>{level}</span>
                </div>
            </h2>
            <h3 className='no-need pc'>
                {language === 'en' ? 'Remaining Moves: ' : 'Преост. Потези: '}
                <span className={movesColor}>{movesLeft}</span>
            </h3>
            <h4>
                <FaKey style={{ transform: 'translateY(15%)' }} /> x{' '}
                <span className={keysColor}>{keys} </span>
                <span className='no-need phone'>
                    {language === 'en' ? 'Moves: ' : 'Потег: '}
                    <span className={movesColor}>{movesLeft}</span>
                </span>
                <Stars stars={stars} />
            </h4>
            <h5>
                <span className='no-need'>
                    <span className='pc'>
                        {language === 'en' ? (
                            'Lucky Match: '
                        ) : (
                            <span className='small-letters'>
                                Спарка на Среќа:{' '}
                            </span>
                        )}
                        {luckyMatch.count}.{' '}
                    </span>
                    <span className='pc'>
                        {language === 'en' ? (
                            'Moves: '
                        ) : (
                            <span className='small-letters'>Потег: </span>
                        )}
                        {swapMatch.count}.
                    </span>
                </span>{' '}
                {language === 'en' ? (
                    'Lucky Points: '
                ) : (
                    <span className='small-letters'>Среќни Поени: </span>
                )}
                <span className={luckyColor}>{luckyMatch.points}. </span>
                {language === 'en' ? (
                    'Move Points: '
                ) : (
                    <span className='small-letters'>Поени од Потег: </span>
                )}
                <span className={matchColor}>{swapMatch.points}</span>
            </h5>
        </div>
    );
}
