import { useEffect } from 'react';
import BoxItem from './BoxItem';

export default function BoxField({
    field,
    item,
    active,
    fields,
    matchedFields,
    setMatchedFields,
    changeFields,
    rows,
    columns,
    numberOfItems,
    index,
    neighbors,
    setNeighbors,
    activeIndex,
    setActiveIndex,
    swap,
    setSwap,
    points,
    specialItems,
    setSpecialItems,
    moves,
    startGame,
    setStartGame,
    setFillPoints,
    touchPos,
    setTouchPos,
    mouseDown,
    setMouseDown,
    touchDown,
    setTouchDown,
    swapIndex,
    setSwapIndex,
}) {
    //
    // Basic variables //
    const letterUp = rows.indexOf(field[0]) + 1;
    const fieldUp = rows[letterUp] && rows[letterUp] + field[1];
    const indexUp = fields.findIndex((el) => el.field === fieldUp);
    const upperItem = fields[indexUp]?.element;
    //
    //
    let randomItem = `item-${Math.ceil(Math.random() * numberOfItems)}`;
    const lastItem = field.includes(rows[rows.length - 1]);
    let element = upperItem ? upperItem : randomItem;
    //
    //
    let r1 = !specialItems.length && points > 300;
    let r2 = specialItems.length === 1 && points > 600;
    let r3 = specialItems.length === 2 && points > 900;
    let r4 = specialItems.length === 3 && points > 1200 && moves < 30;
    let r5 = specialItems.length === 4 && points > 1500 && moves < 35;

    //
    //
    // Execute Functions //
    useEffect(() => {
        checkForSpecialItem();
        // eslint-disable-next-line
    }, [item]);

    useEffect(() => {
        let timeout;
        clearTimeout(timeout);
        onInitStartGame();
        return () => (timeout = setTimeout(() => setStartGame(true), 1500));
        // eslint-disable-next-line
    }, [fields]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (startGame === true) {
                fillEmptyFields();
                fillAllEmptyFields();
                makeNewEmptyFields();
            }
        }, 50);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [startGame, item, swap]);

    //
    //
    // Fill Fields on Component Mount //
    const onInitStartGame = () => {
        if (startGame === 'init') {
            fillEmptyFields();
            fillAllEmptyFields();
            makeNewEmptyFields();
        }
    };

    //
    //
    // Check for special Items //
    const checkForSpecialItem = () => {
        if (item === 'empty' && !specialItems.includes('special-1')) {
            if (r1) setSpecialItems(['special-1']);
            if (r2) setSpecialItems((oldArr) => ['special-1', ...oldArr]);
            if (r3) setSpecialItems((oldArr) => ['special-1', ...oldArr]);
            if (r4) setSpecialItems((oldArr) => ['special-1', ...oldArr]);
            if (r5) setSpecialItems((oldArr) => ['special-1', ...oldArr]);
        }
    };

    //
    //
    // Fill upper fields with items //
    const fillEmptyFields = () => {
        if (
            specialItems.length &&
            specialItems[0] === 'special-1' &&
            randomItem &&
            item === 'empty' &&
            lastItem
        ) {
            element = specialItems[0];
            setSpecialItems((oldArr) => {
                oldArr[0] = 'used-item';
                return [...oldArr];
            });

            changeFields((oldArr) => {
                oldArr[index] = { field, element, active };
                return [...oldArr];
            });
        }

        if (item === 'empty' && lastItem) {
            changeFields((oldArr) => {
                oldArr[index] = { field, element, active };
                return [...oldArr];
            });
        }
    };

    //
    //
    // Fill all fields with items //
    const fillAllEmptyFields = () => {
        if (item === 'empty' && !lastItem) {
            let newObj = { field, element, active };
            changeFields((oldArr) => {
                oldArr[index] = {
                    ...newObj,
                    element: oldArr[indexUp].element,
                };

                return [...oldArr];
            });
        }
    };

    //
    //
    // If Field is empty get item from upper field //
    const makeNewEmptyFields = () => {
        if (item === 'empty' && !lastItem) {
            changeFields((oldArr) => {
                oldArr[indexUp] = { ...oldArr[indexUp], element: 'empty' };

                return [...oldArr];
            });
        }
    };

    //
    //
    // Get info from neighbor fields //
    const getNeighbors = () => {
        const l = field[0];
        const n = Number(field[1]);
        let i = rows.findIndex((el) => el === l);

        const down = `${rows[i - 1]}${n}`;
        const up = `${rows[i + 1]}${n}`;
        const left = `${l}${n - 1}`;
        const right = `${l}${n + 1}`;

        // in the middle...
        if (
            l !== rows[0] &&
            l !== rows[rows.length - 1] &&
            n !== 1 &&
            n !== columns
        ) {
            setNeighbors({ down, up, left, right });
        }

        // in the corners...
        if (l === rows[0] && n === 1) {
            // no left or down
            setNeighbors({ up, right });
        }

        if (l === rows[rows.length - 1] && n === 1) {
            // no left or up
            setNeighbors({ down, right });
        }

        if (l === rows[rows.length - 1] && n === columns) {
            // no right or up
            setNeighbors({ down, left });
        }

        if (l === rows[0] && n === columns) {
            // no right or down
            setNeighbors({ up, left });
        }

        // on the sides...
        if (l === rows[0] && n !== 1 && n !== columns) {
            // no down
            setNeighbors({ up, left, right });
        }
        if (l === rows[rows.length - 1] && n !== 1 && n !== columns) {
            // no up
            setNeighbors({ down, left, right });
        }
        if (n === 1 && l !== rows[0] && l !== rows[rows.length - 1]) {
            // no left
            setNeighbors({ up, down, right });
        }
        if (n === columns && l !== rows[0] && l !== rows[rows.length - 1]) {
            // no right
            setNeighbors({ up, down, left });
        }
    };

    //
    //
    // Set Active field or swap if active on Click //
    const clicked = (e) => {
        let activeField = false;
        let noEmptyFileds = !fields.filter((o) => o.element === 'empty').length;

        if (!noEmptyFileds) setSwap([]);

        let oldSwapObj;
        if (Object.entries(neighbors).length) {
            Object.entries(neighbors).forEach(([key, value]) => {
                if (swapIndex || value === field) {
                    if (swapIndex) {
                        let activeEl = fields[activeIndex].element;
                        let swapEl = fields[swapIndex].element;
                        let activeObj = {
                            ...fields[activeIndex],
                            element: swapEl,
                        };
                        let swapObj = {
                            ...fields[swapIndex],
                            element: activeEl,
                        };
                        oldSwapObj = fields[swapIndex];

                        changeFields((oldArr) => {
                            oldArr[activeIndex] = activeObj;
                            oldArr[swapIndex] = swapObj;

                            return [...oldArr];
                        });
                    } else {
                        let activeEl = fields[activeIndex].element;
                        let swapEl = fields[index].element;
                        let activeObj = {
                            ...fields[activeIndex],
                            element: swapEl,
                        };
                        let swapObj = { ...fields[index], element: activeEl };
                        oldSwapObj = fields[index];

                        changeFields((oldArr) => {
                            oldArr[activeIndex] = activeObj;
                            oldArr[index] = swapObj;

                            return [...oldArr];
                        });
                    }

                    setNeighbors({});
                    activeField = true;
                    return oldSwapObj;
                }
            });
        }

        // if no active field
        if (noEmptyFileds && !activeField && swap.length !== 2) {
            getNeighbors();

            changeFields((oldArr) => {
                oldArr.forEach((obj, i) => {
                    oldArr[i].active = '';
                });
                oldArr[index] = { ...oldArr[index], active: 'active' };

                return [...oldArr];
            });

            setSwap(() => [{ fieldIndex: index, ...fields[index] }]);

            setActiveIndex(index);
        }

        // if special item is an active element
        if (noEmptyFileds && activeField && swap[0]?.element === 'special-1') {
            let blowLines = [];

            if (swapIndex) {
                setMouseDown(false);
                setTouchDown(false);
                setSwap((actSwapObj) => {
                    return [
                        ...actSwapObj,
                        { fieldIndex: swapIndex, ...oldSwapObj },
                    ];
                });
            } else {
                setSwap((actSwapObj) => {
                    return [
                        ...actSwapObj,
                        { fieldIndex: index, ...oldSwapObj },
                    ];
                });
            }

            fields.forEach((obj, i) => {
                let l, n;
                if (swapIndex) {
                    let field = fields[swapIndex].field;
                    l = obj.field.includes(field[0]);
                    n = obj.field.includes(field[1]);
                } else {
                    l = obj.field.includes(field[0]);
                    n = obj.field.includes(field[1]);
                }
                if (l || n) {
                    setTimeout(() => {
                        changeFields((oldArr) => {
                            oldArr[i] = {
                                ...oldArr[i],
                                element: 'empty',
                                active: '',
                            };
                            return [...oldArr];
                        });
                    }, 300);
                    blowLines.unshift(fields[i].field);
                }
            });
            setMatchedFields((oldArr) => [...oldArr, ...blowLines]);
            setFillPoints((prevArr) => {
                if (prevArr.length) return [...prevArr, 85];
                if (!prevArr.length) return [85];
            });

            setTimeout(() => {
                setMatchedFields([]);
            }, 1000);

            setActiveIndex(undefined);
        }
        // if active field
        if (noEmptyFileds && activeField && swap[0]?.element !== 'special-1') {
            if (swapIndex) {
                setTouchDown(false);
                setMouseDown(false);
                setSwap((actSwapObj) => {
                    return [
                        ...actSwapObj,
                        { fieldIndex: swapIndex, ...oldSwapObj },
                    ];
                });
            } else {
                setSwap((actSwapObj) => {
                    return [
                        ...actSwapObj,
                        { fieldIndex: index, ...oldSwapObj },
                    ];
                });
            }

            changeFields((oldArr) => {
                oldArr.forEach((obj, i) => {
                    oldArr[i].active = '';
                });

                return [...oldArr];
            });

            setTimeout(() => setMatchedFields([]), 500);
            setActiveIndex(undefined);
        }
    };

    const mouseMove = (e) => {
        if (mouseDown && swap.length) {
            clicked(e);
        }
        if (swap.length === 2) {
            setMouseDown(false);
            setTouchDown(false);
        }
    };

    const touchStart = (e) => {
        let obj = {
            clientX: e.changedTouches[0].clientX,
            clientY: e.changedTouches[0].clientY,
        };
        setTouchPos(obj);

        setTouchDown(true);
        setMouseDown(false);
        clicked(e);
    };

    const touchMove = (e) => {
        if (swap.length === 2) {
            setSwapIndex(undefined);
            setMouseDown(false);
            setTouchDown(false);
        }
        if (!mouseDown && touchDown && swap.length) {
            // if (swapIndex) clicked(e);
            let { clientX, clientY } = touchPos;
            let swipeX = e.changedTouches[0].clientX;
            let swipeY = e.changedTouches[0].clientY;

            let rightTouch =
                !swapIndex && clientX + 60 < swipeX && neighbors.right;
            let leftTouch =
                !swapIndex && clientX - 60 > swipeX && neighbors.left;
            let downTouch =
                !swapIndex && clientY + 60 < swipeY && neighbors.down;
            let upTouch = !swapIndex && clientY - 60 > swipeY && neighbors.up;

            if (rightTouch && !leftTouch && !downTouch && !upTouch) {
                let swipeIndexLocale = fields.findIndex(
                    (el) => el.field === neighbors.right
                );
                setSwapIndex(swipeIndexLocale);
            }
            if (leftTouch && !rightTouch && !downTouch && !upTouch) {
                let swipeIndexLocale = fields.findIndex(
                    (el) => el.field === neighbors.left
                );
                setSwapIndex(swipeIndexLocale);
            }
            if (downTouch && !upTouch && !leftTouch && !rightTouch) {
                let swipeIndexLocale = fields.findIndex(
                    (el) => el.field === neighbors.down
                );
                setSwapIndex(swipeIndexLocale);
            }
            if (upTouch && !downTouch && !leftTouch && !rightTouch) {
                let swipeIndexLocale = fields.findIndex(
                    (el) => el.field === neighbors.up
                );
                setSwapIndex(swipeIndexLocale);
            }
        }
    };

    return (
        <div
            className={`box-field ${field} ${active} ${
                matchedFields.includes(field) ? 'blow' : ''
            }`}
            onMouseDown={(e) => {
                setMouseDown(true);
                setTouchDown(false);
                clicked(e);
            }}
            onMouseUp={() => {
                setTouchDown(false);
                setMouseDown(false);
            }}
            onMouseMove={mouseMove}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={(e) => {
                setSwapIndex(undefined);
                setTouchDown(false);
                setMouseDown(false);
                if (swapIndex) clicked(e);
            }}>
            <BoxItem item={item} />
        </div>
    );
}
