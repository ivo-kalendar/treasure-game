import { useState, useEffect } from 'react';
import '../styles/App.css';
import Logo from './Logo';
import Play from './Play';
import GameBox from './GameBox';
import GameBar from './GmeBar';
import HowToPlay from './HowToPlay';
import LevelCompleted from './LevelCompleted';

export default function App() {
    //
    //
    //
    const [playGame, setPlayGame] = useState(false);
    const [points, setPoints] = useState(0);
    const [moves, setMoves] = useState(0);
    const [keys, setKeys] = useState(0);
    const [stars, setStars] = useState(0);
    const [luckyMatch, setLuckyMatch] = useState({ count: 0, points: 0 });
    const [swapMatch, setSwapMatch] = useState({ count: 0, points: 0 });
    const [startGame, setStartGame] = useState(false);
    const [gameScreen, setGameScreen] = useState('');
    const [startOver, setStartOver] = useState(true);
    // const [level, setLevel] = useState(0);

    useEffect(() => {
        getKeys();
        getStars();
        restartTheGame();
        // eslint-disable-next-line
    }, [points, moves]);

    useEffect(() => {
        if (playGame) setGameScreen('game-');
    }, [playGame]);

    useEffect(() => {
        if (!startOver) setStartOver(true);
    }, [startOver]);

    const restartTheGame = () => {
        if (moves > 39) {
            setGameScreen('');
        }
        if (moves === 0) {
            setGameScreen('game-');
            setPoints(0);
            setKeys(0);
            setStars(0);
            setLuckyMatch({ count: 0, points: 0 });
            setSwapMatch({ count: 0, points: 0 });
            // setStartOver(true);
        }
    };

    const getKeys = () => {
        if (points > 250 && moves < 10) setKeys((prev) => (prev = prev + 1));
        if (points > 500 && moves < 20) setKeys((prev) => (prev = prev + 1));
        if (points > 750 && moves < 25) setKeys((prev) => (prev = prev + 1));
        if (points > 1000 && moves < 30) setKeys((prev) => (prev = prev + 1));
    };

    let luckyStar = 0;
    let movesStars = 0;
    const getStars = () => {
        if (luckyMatch.points > 99) luckyStar = 1;
        if (swapMatch.points > 99) movesStars = 1;
        if (luckyMatch.points > 199) luckyStar = 3;
        if (swapMatch.points > 199) movesStars = 3;
        let fp = luckyStar + movesStars;
        if (fp === 4) fp = 3;

        setStars(fp);
    };

    const appStyle = { width: window.innerWidth, height: window.innerHeight };
    const makeAMove = () => setMoves((prev) => prev + 1);

    return (
        <div style={appStyle} className='App'>
            {playGame ? (
                <>
                    {moves > 39 && (
                        <LevelCompleted
                            points={points}
                            moves={moves}
                            keys={keys}
                            stars={stars}
                            luckyMatch={luckyMatch}
                            swapMatch={swapMatch}
                            setMoves={setMoves}
                            setStartOver={setStartOver}
                        />
                    )}
                    <div className={`${gameScreen}screen`}>
                        {startOver && (
                            <GameBox
                                points={points}
                                setPoints={setPoints}
                                moves={moves}
                                setLuckyMatch={setLuckyMatch}
                                setSwapMatch={setSwapMatch}
                                makeAMove={makeAMove}
                                startGame={startGame}
                                setStartGame={setStartGame}
                            />
                        )}
                        <GameBar
                            points={points}
                            moves={moves}
                            keys={keys}
                            stars={stars}
                            luckyMatch={luckyMatch}
                            swapMatch={swapMatch}
                        />
                    </div>
                </>
            ) : (
                <>
                    <HowToPlay />
                    <Logo />
                    <Play setPlayGame={setPlayGame} />
                </>
            )}
        </div>
    );
}
