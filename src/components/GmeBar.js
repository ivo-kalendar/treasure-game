import { useEffect, useState } from 'react';

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
                {movesLeft}
            </h3>
            <h4>
                {language === 'en' ? 'Keys: ' : 'Клуч: '}
                {keys}.{language === 'en' ? ' Stars: ' : ' Звезди: '}
                {stars}{' '}
                <span className='no-need phone'>
                    {language === 'en' ? 'Moves: ' : 'Потег: '}
                    {movesLeft}
                </span>
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
                {luckyMatch.points}.{' '}
                {language === 'en' ? (
                    'Move Points: '
                ) : (
                    <span className='small-letters'>Поени од Потег: </span>
                )}
                {swapMatch.points}
            </h5>
        </div>
    );
}
