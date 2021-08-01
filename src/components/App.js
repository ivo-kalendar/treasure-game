import { useState, useEffect } from 'react';
import '../styles/App.css';
import GameBox from './GameBox';
import GameBar from './GmeBar';

export default function App() {
    //
    //
    //
    const [points, setPoints] = useState(0);
    const [moves, setMoves] = useState(0);
    const [keys, setKeys] = useState(0);
    const [luckyMatch, setLuckyMatch] = useState({ count: 0, points: 0 });
    const [swapMatch, setSwapMatch] = useState({ count: 0, points: 0 });
    // const [level, setLevel] = useState(0);

    useEffect(() => {
        getKeys();
        // eslint-disable-next-line
    }, [points]);

    const getKeys = () => {
        if (points > 250 && moves < 10) setKeys((prev) => (prev = prev + 1));
        if (points > 500 && moves < 20) setKeys((prev) => (prev = prev + 1));
        if (points > 7500 && moves < 25) setKeys((prev) => (prev = prev + 1));
        if (points > 1000 && moves < 30) setKeys((prev) => (prev = prev + 1));
    };

    const makeAMove = () => setMoves((prev) => prev + 1);

    return (
        <div className='App'>
            <GameBar
                points={points}
                moves={moves}
                keys={keys}
                luckyMatch={luckyMatch}
                swapMatch={swapMatch}
            />
            <GameBox
                points={points}
                setPoints={setPoints}
                moves={moves}
                // setMoves={setMoves}
                setLuckyMatch={setLuckyMatch}
                setSwapMatch={setSwapMatch}
                makeAMove={makeAMove}
            />
        </div>
    );
}
