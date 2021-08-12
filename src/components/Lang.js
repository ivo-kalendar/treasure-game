export default function Lang({ language, setLanguage }) {
    return (
        <button
            onClick={() => setLanguage((prev) => (prev === 'en' ? 'mk' : 'en'))}
            style={{
                bottom: window.innerHeight / 1.1,
            }}
            className='play lang'>
            {language === 'en' ? (
                <>
                    <span className='default-lang'>Eng </span>/ Мкд
                </>
            ) : (
                <>
                    Eng / <span className='default-lang'>Мкд</span>
                </>
            )}

            {/* Како Се Игра? */}
        </button>
    );
}
