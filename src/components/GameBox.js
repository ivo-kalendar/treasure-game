import { useEffect, useState } from 'react';
import BoxField from './BoxField';

export default function GameBox({
    points,
    setPoints,
    makeAMove,
    moves,
    setSwapMatch,
    setLuckyMatch,
    startGame,
    setStartGame,
    stedyBox,
    setStedyBox,
}) {
    // Basic variables //
    const columns = [1, 2, 3, 4, 5, 6, 7];
    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let different = 6;
    // State variables //
    const [swap, setSwap] = useState([]);
    const [fields, setFields] = useState([]);
    const [matchedFields, setMatchedFields] = useState([]);
    const [neighbors, setNeighbors] = useState({});
    const [activeIndex, setActiveIndex] = useState(undefined);
    const [specialItems, setSpecialItems] = useState([]);
    const [fillPoints, setFillPoints] = useState([]);

    //
    //
    // Execute Functions //
    useEffect(() => {
        makeFields();
        setStartGame('init');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => checkFillPoints(), 2000);
        let timer = setTimeout(() => setStedyBox([]), 3000);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [fillPoints]);

    useEffect(() => {
        let timer = setTimeout(() => donePushingToMatched(), 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [matchedFields]);

    useEffect(() => {
        let emptyArr = fields.filter((o) => o.element === 'empty');
        if (emptyArr.length && matchedFields.length) {
            setStedyBox([...emptyArr, ...matchedFields]);
        }

        setTimeout(() => checkMatch(), 150);
        // eslint-disable-next-line
    }, [fields, matchedFields]);

    //
    //
    // After pushing object to matched is done //
    const donePushingToMatched = () => {
        if (swap.length === 2 && matchedFields.length) {
            makeAMove();
            matchOnSwap(); // match on swap
        }
        if (
            swap.length === 2 &&
            !matchedFields.length &&
            swap[0].element !== 'special-1'
        ) {
            makeAMove();
            swapBack(); // no match
        }
        if (matchedFields.length && !swap.length) {
            matchOnLuck(); // match on luck
        }
        if (matchedFields.length) setMatchedFields([]);
    };

    //
    //
    // Check for match when you start the game or after you make a match //
    const matchOnLuck = () => {
        if (moves === 0) {
            // setFillPoints(0);
            setFillPoints((prevArr) => {
                if (prevArr.length) return prevArr.shift();
                if (!prevArr.length) return [];
            });
        } else {
            fillAndCountPoints();
        }

        setLuckyMatch((prev) => {
            let { points, count } = prev;
            points = points + matchedFields.length;
            count = count + 1;
            return { points, count };
        });
    };

    //
    //
    // When we have match on swap //
    const matchOnSwap = () => {
        fillAndCountPoints();

        setSwapMatch((prev) => {
            let { points, count } = prev;
            points = points + matchedFields.length;
            count = count + 1;
            return { count, points };
        });

        setSwap([]);
    };

    //
    //
    // On Swap if no match swap back //
    const swapBack = () => {
        console.log('NO MATCH ON SWAP', matchedFields);
        setFields((oldArr) => {
            const { fieldIndex: firstIndex, ...firstObj } = swap[0];
            const { fieldIndex: secondIndex, ...secondObj } = swap[1];
            oldArr[firstIndex] = { ...firstObj };
            oldArr[secondIndex] = { ...secondObj };
            oldArr.forEach((obj, i) => {
                oldArr[i].active = '';
            });
            return [...oldArr];
        });
        setSwapMatch((prev) => {
            let { points, count } = prev;
            points = points < 5 ? 0 : points - 5;
            count = count < 1 ? 0 : count - 1;
            return { points, count };
        });

        setSwap([]);
    };

    //
    //
    //  Check if fillpoints array has length //
    const checkFillPoints = () => {
        if (fillPoints.length && moves !== 0) {
            console.log('glitch', fillPoints);
            fillAndCountPoints();
        }
    };

    //
    //
    //  Points Counter //
    const fillAndCountPoints = () => {
        if (fillPoints.length) {
            for (let i = 0; i < fillPoints[0]; i++) {
                let speed = (i * 60) / 2;
                setTimeout(() => setPoints((prev) => prev + 1), speed);
            }
        }
        setFillPoints((prevArr) => {
            if (prevArr.length) return prevArr.shift();
            if (!prevArr.length) return [];
        });
    };

    //
    //
    // Get Points and send to counter //
    const getRealPoints = (pointsArr) => {
        if (pointsArr.length > 1) {
            pointsArr.forEach((a, i, arr) => {
                if (
                    arr[i + 1] &&
                    arr[i + 2] &&
                    arr[i + 1].includes(a[1]) &&
                    arr[i + 1].includes(a[2]) &&
                    arr[i + 2].includes(arr[i + 1][1]) &&
                    arr[i + 2].includes(arr[i + 1][2])
                ) {
                    let towArrs = [...a, ...arr[i + 1], ...arr[i + 2]];
                    let combined = [...new Set(towArrs)];
                    pointsArr.splice(i, 3, combined);
                }

                if (
                    arr[i + 1] &&
                    arr[i + 1].includes(a[1]) &&
                    arr[i + 1].includes(a[2])
                ) {
                    let towArrs = [...a, ...arr[i + 1]];
                    let combined = [...new Set(towArrs)];
                    pointsArr.splice(i, 2, combined);
                }
            });
        }

        let comboPTS = pointsArr.length * pointsArr.length * pointsArr.length;
        let matchPTS = 0;
        pointsArr.map((arr) => {
            let matchThree = arr.length === 3 ? 6 : 0;
            let matchFour = arr.length === 4 ? 49 : 0;
            let matchFive = arr.length === 5 ? 199 : 0;
            matchPTS = matchPTS + matchThree + matchFour + matchFive;
            return matchPTS;
        });

        setFillPoints((prevArr) => {
            if (prevArr.length) return [...prevArr, comboPTS + matchPTS];
            if (!prevArr.length) return [comboPTS + matchPTS];
        });
    };

    //
    //
    // Create Fields with no Items //
    const makeFields = () => {
        if (!fields.length) {
            let emptyArr = [];

            rows.reverse();
            rows.forEach((el) => {
                columns.forEach((e, i) => {
                    let field = `${el}${i + 1}`;
                    let emptyObj = { field, element: 'empty', active: '' };
                    emptyArr.push(emptyObj);
                });
            });

            setFields(emptyArr);
        }
    };

    //
    //
    // Check for fields with identical items //
    const checkMatch = () => {
        let matchThree = [];
        let pointsArr = [];

        const emptyEl = fields.filter((obj) => obj.element === 'empty');
        if (fields.length && !emptyEl.length) {
            chekDirectionMatch(pointsArr, matchThree, rows);
            chekDirectionMatch(pointsArr, matchThree, columns);
        }
        if (matchThree.length) {
            getRealPoints(pointsArr);

            fields.forEach((obj, i) => {
                let newObj;
                if (matchThree.includes(obj.field)) {
                    newObj = obj;
                    newObj.element = 'empty';
                    setMatchedFields((oldArr) => {
                        let fullArr = [...oldArr, ...matchThree];
                        return [...new Set(fullArr)];
                    });
                }
            });
        }
    };

    //
    //
    // Check every line for identical items //
    const chekDirectionMatch = (pointsArr, matchThree, direction) => {
        direction.forEach((l) => {
            const posibleMatchArr = fields.filter((obj) =>
                obj.field.includes(l)
            );
            posibleMatchArr.map((obj, i, arr) => {
                let before = arr[i - 1];
                let after = arr[i + 1];

                if (
                    i !== 0 &&
                    i !== posibleMatchArr.length - 1 &&
                    obj.element === before.element &&
                    obj.element === after.element
                ) {
                    pointsArr.push([before.field, obj.field, after.field]);
                    matchThree.push(before.field, obj.field, after.field);
                }
                return matchThree;
            });
        });
    };

    //
    //
    //
    return (
        <div className='game-box'>
            {fields.map(({ field, element, active }, index) => (
                <BoxField
                    key={field}
                    field={field}
                    fields={fields}
                    item={element}
                    active={active}
                    matchedFields={matchedFields}
                    setMatchedFields={setMatchedFields}
                    changeFields={setFields}
                    rows={rows}
                    columns={columns.length}
                    numberOfItems={different}
                    index={index}
                    neighbors={neighbors}
                    setNeighbors={setNeighbors}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    swap={swap}
                    setSwap={setSwap}
                    points={points}
                    specialItems={specialItems}
                    setSpecialItems={setSpecialItems}
                    moves={moves}
                    startGame={startGame}
                    setStartGame={setStartGame}
                    setFillPoints={setFillPoints}
                />
            ))}
        </div>
    );
}
