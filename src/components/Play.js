export default function Play({
    level,
    language,
    setPlayGame,
    setShowInfoBoard,
    setTxtIndex,
}) {
    return (
        <button
            className='play'
            onClick={() => {
                setPlayGame(true);
                setShowInfoBoard(true);
                setTxtIndex(level);
            }}>
            {language === 'en' ? 'PLAY' : 'ИГРАЈ'}
        </button>
    );
}
