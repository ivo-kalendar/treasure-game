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

    //
    //
    // Execute Functions //
    useEffect(() => {
        makeFields();
        setStartGame('init');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => donePushingToMatched(), 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [matchedFields]);

    useEffect(() => {
        setTimeout(() => checkMatch(), 300);
        // eslint-disable-next-line
    }, [fields, matchedFields]);

    //
    //
    //
    // After pushing object to matched is done
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
        setMatchedFields([]);
    };

    //
    //
    //
    // Check for match when you start the game or after you make a match //
    const matchOnLuck = () => {
        let eP = getPoints() ? getPoints() : 0;
        setPoints((prev) => prev + eP);
        // eP = eP % 2 === 0 ? eP / 2 : (eP - 1) / 2;

        // console.log('MATCH ON LUCK!', matchedFields);
        setLuckyMatch((prev) => {
            let { points, count } = prev;
            points = points + matchedFields.length;
            count = count + 1;
            return { points, count };
        });
    };

    //
    //
    //
    // When we have match on swap //
    const matchOnSwap = () => {
        let eP = getPoints() ? getPoints() : 0;
        setPoints((prev) => prev + eP);

        // console.log('MATCH ON SWAP', matchedFields);
        setSwapMatch((prev) => {
            let { points, count } = prev;
            points = points + matchedFields.length;
            count = count + 1;
            return { count, points };
        });
        // setSwapMatch((prev) => (prev = prev.count + 1));

        setSwap([]);
    };

    //
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
    //
    // get Points //
    const getPoints = (finalPoints = 0) => {
        let fPoints = matchedFields.length;

        // Points for Match Three
        let matchThreePoints = fPoints === 3 ? 5 : 0;
        let matchDoubleThrees = fPoints === 6 ? 15 : 0;
        let matchThrippleThrees = fPoints === 9 ? 30 : 0;
        let mt = matchThreePoints + matchDoubleThrees + matchThrippleThrees;

        // Points for Match Four
        let matchFour = fPoints === 4 ? 30 : 0;
        let matchFourAndThree = fPoints === 7 ? 45 : 0;
        let matchDoubleFours = fPoints === 8 ? 70 : 0;
        let mf = matchFour + matchFourAndThree + matchDoubleFours;

        // Points for Match Five
        let matchFive = fPoints === 5 ? 100 : 0;
        let matchDoubleFives = fPoints === 10 ? 150 : 0;
        let mm = matchFive + matchDoubleFives;

        finalPoints = fPoints + mt + mf + mm;
        return finalPoints;
    };

    //
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
    //
    // Check for fields with identical items //
    const checkMatch = () => {
        let matchThree = [];
        const emptyEl = fields.filter((obj) => obj.element === 'empty');
        if (fields.length && !emptyEl.length) {
            chekDirectionMatch(matchThree, rows);
            chekDirectionMatch(matchThree, columns);
        }
        if (matchThree.length) {
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
    const chekDirectionMatch = (matchThree, direction) => {
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
                    setPoints={setPoints}
                    specialItems={specialItems}
                    setSpecialItems={setSpecialItems}
                    moves={moves}
                    startGame={startGame}
                    setStartGame={setStartGame}
                />
            ))}
        </div>
    );
}
