export default function HowToPlay({ language, setShowInfoBoard, setTxtIndex }) {
    return (
        <button
            onClick={() => {
                setShowInfoBoard(true);
                setTxtIndex(0);
            }}
            style={{
                bottom: window.innerHeight / 1.1,
            }}
            className='play howtoplay'>
            {language === 'en' ? 'How To Play?' : 'Како Се Игра?'}
        </button>
    );
}
