import { useState, useEffect } from 'react';
import '../styles/App.css';
import Logo from './Logo';
import Play from './Play';
import GameBox from './GameBox';
import GameBar from './GmeBar';
import HowToPlay from './HowToPlay';

export default function App() {
    //
    //
    //
    const [playGame, setPlayGame] = useState(false);
    const [points, setPoints] = useState(0);
    const [moves, setMoves] = useState(0);
    const [keys, setKeys] = useState(0);
    const [luckyMatch, setLuckyMatch] = useState({ count: 0, points: 0 });
    const [swapMatch, setSwapMatch] = useState({ count: 0, points: 0 });
    const [startGame, setStartGame] = useState(false);
    const [gameScreen, setGameScreen] = useState('');
    // const [level, setLevel] = useState(0);

    useEffect(() => {
        getKeys();
        // eslint-disable-next-line
    }, [points]);

    useEffect(() => {
        if (playGame) setGameScreen('game-');
    }, [playGame]);

    const getKeys = () => {
        if (points > 250 && moves < 10) setKeys((prev) => (prev = prev + 1));
        if (points > 500 && moves < 20) setKeys((prev) => (prev = prev + 1));
        if (points > 750 && moves < 25) setKeys((prev) => (prev = prev + 1));
        if (points > 1000 && moves < 30) setKeys((prev) => (prev = prev + 1));
    };

    const appStyle = { width: window.innerWidth, height: window.innerHeight };
    const makeAMove = () => setMoves((prev) => prev + 1);

    return (
        <div style={appStyle} className='App'>
            {playGame ? (
                <div className={`${gameScreen}screen`}>
                    <GameBox
                        points={points}
                        setPoints={setPoints}
                        moves={moves}
                        // setMoves={setMoves}
                        setLuckyMatch={setLuckyMatch}
                        setSwapMatch={setSwapMatch}
                        makeAMove={makeAMove}
                        startGame={startGame}
                        setStartGame={setStartGame}
                    />
                    <GameBar
                        points={points}
                        moves={moves}
                        keys={keys}
                        luckyMatch={luckyMatch}
                        swapMatch={swapMatch}
                    />
                </div>
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
