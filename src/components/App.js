import { useState, useEffect } from 'react';
import '../styles/App.css';
import Logo from './Logo';
import Play from './Play';
import GameBox from './GameBox';
import GameBar from './GmeBar';
import HowToPlay from './HowToPlay';
import LevelCompleted from './LevelCompleted';
import InfoBoard from './InfoBoard';

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
    const [stedyBox, setStedyBox] = useState([]);
    const [level, setLevel] = useState(1);
    const [showInfoBoard, setShowInfoBoard] = useState(false);
    const movesLimit = 39; // 39

    useEffect(() => {
        restartTheGame();
        // eslint-disable-next-line
    }, [moves]);

    useEffect(() => {
        getKeys();
        getStars();
        // eslint-disable-next-line
    }, [luckyMatch, swapMatch]);

    useEffect(() => {
        setGameScreen('');
        if (playGame) setGameScreen('game-');
    }, [playGame]);

    useEffect(() => {
        if (!startOver) setStartOver(true);
    }, [startOver]);

    const restartTheGame = async () => {
        if (moves > movesLimit) {
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
        if (points > 200 && moves < 8) setKeys((prev) => (prev = prev + 1));
        if (points > 500 && moves < 10) setKeys((prev) => (prev = prev + 1));
        if (points > 750 && moves < 15) setKeys((prev) => (prev = prev + 1));
        if (points > 1000 && moves < 20) setKeys((prev) => (prev = prev + 1));
    };

    let luckyStar = 0;
    let movesStars = 0;
    const getStars = () => {
        if (luckyMatch.points > 99) luckyStar = 1;
        if (swapMatch.points > 99) movesStars = 1;
        if (luckyMatch.points > 199) luckyStar = 2;
        if (swapMatch.points > 199) movesStars = 2;
        let fp = luckyStar + movesStars;
        if (fp === 4) fp = 3;

        setStars(fp);
    };

    const appStyle = { width: window.innerWidth, height: window.innerHeight };
    const makeAMove = () => setMoves((prev) => prev + 1);

    return (
        <div style={appStyle} className='App'>
            <InfoBoard
                showInfoBoard={showInfoBoard}
                setShowInfoBoard={setShowInfoBoard}
            />
            {playGame ? (
                <>
                    {moves > movesLimit && (
                        <LevelCompleted
                            points={points}
                            moves={moves}
                            keys={keys}
                            stars={stars}
                            luckyMatch={luckyMatch}
                            swapMatch={swapMatch}
                            setMoves={setMoves}
                            setStartOver={setStartOver}
                            movesLimit={movesLimit}
                            stedyBox={stedyBox}
                            level={level}
                            setLevel={setLevel}
                            setShowInfoBoard={setShowInfoBoard}
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
                                stedyBox={stedyBox}
                                setStedyBox={setStedyBox}
                            />
                        )}
                        <GameBar
                            points={points}
                            moves={moves}
                            keys={keys}
                            stars={stars}
                            luckyMatch={luckyMatch}
                            swapMatch={swapMatch}
                            level={level}
                        />
                    </div>
                    {moves < movesLimit && (
                        <button
                            onClick={() => {
                                setMoves(0);
                                setPoints(0);
                                setKeys(0);
                                setStars(0);
                                setLuckyMatch({ count: 0, points: 0 });
                                setSwapMatch({ count: 0, points: 0 });
                                setStartOver(false);
                            }}
                            className='play howtoplay restart'>
                            Restart
                        </button>
                    )}
                </>
            ) : (
                <>
                    <HowToPlay setShowInfoBoard={setShowInfoBoard} />
                    <Logo />
                    <Play
                        setPlayGame={setPlayGame}
                        setShowInfoBoard={setShowInfoBoard}
                    />
                </>
            )}
        </div>
    );
}
