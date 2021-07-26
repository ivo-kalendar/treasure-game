import { useEffect, useState } from 'react';
import BoxItem from './BoxItem';

export default function BoxField({
    field,
    item,
    active,
    fields,
    matchedFields,
    changeFields,
    // letters,
    rows,
    columns,
    numberOfItems,
    index,
    neighbors,
    setNeighbors,
    activeIndex,
    setActiveIndex,
}) {
    //
    //
    //
    useEffect(() => {
        fillEmptyFields();
        fillAllEmptyFields();
        // eslint-disable-next-line
    }, [fields, matchedFields]);

    // useEffect(() => {
    //     console.log(matchedFields);
    // }, [matchedFields]);

    // useEffect(() => {
    //     if (Object.entries(neighbors).length) {
    //         console.log(neighbors);
    //     }
    //     // eslint-disable-next-line
    // }, [neighbors]);

    //
    //
    //
    const fillEmptyFields = () => {
        if (item === 'empty') {
            const lastItem = field.includes(rows[rows.length - 1]);
            let element = `item-${Math.ceil(Math.random() * numberOfItems)}`;
            let newObj = { field, element, active };

            if (lastItem) {
                changeFields((oldArr) => {
                    oldArr[index] = newObj;
                    return [...oldArr];
                });
            }
        }
    };

    const fillAllEmptyFields = () => {
        for (let i = rows.length - 2; i >= 0; i--) {
            if (item === 'empty' && field.includes(rows[i])) {
                const letterUp = rows.indexOf(field[0]) + 1;
                const fieldUp = rows[letterUp] + field[1];
                const indexUp = fields.findIndex((el) => el.field === fieldUp);

                changeFields((oldArr) => {
                    let upperElement = oldArr[indexUp].element;
                    oldArr[index] = { ...oldArr[index], element: upperElement };
                    return [...oldArr];
                });

                changeFields((oldArr) => {
                    oldArr[indexUp] = { ...oldArr[indexUp], element: 'empty' };
                    return [...oldArr];
                });
            }
        }
    };

    const getNeighbors = () => {
        const l = field[0];
        const n = Number(field[1]);
        let i = rows.findIndex((el) => el === l);

        const down = `${rows[i - 1]}${n}`;
        const up = `${rows[i + 1]}${n}`;
        const left = `${l}${n - 1}`;
        const right = `${l}${n + 1}`;

        //
        //
        // in the middle...
        if (
            l !== rows[0] &&
            l !== rows[rows.length - 1] &&
            n !== 1 &&
            n !== columns
        ) {
            setNeighbors({ down, up, left, right });
        }

        //
        //
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

        //
        //
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

    const clicked = () => {
        let activeField = false;
        if (Object.entries(neighbors).length) {
            Object.entries(neighbors).forEach(([key, value]) => {
                if (value === field) {
                    let activeEl = fields[activeIndex].element;
                    let swapEl = fields[index].element;
                    let activeObj = { ...fields[activeIndex], element: swapEl };
                    let swapObj = { ...fields[index], element: activeEl };
                    changeFields((oldArr) => {
                        oldArr[activeIndex] = activeObj;
                        oldArr[index] = swapObj;

                        return [...oldArr];
                    });
                    setNeighbors({});
                    activeField = true;
                }
            });
        }

        if (!activeField) {
            getNeighbors();

            changeFields((oldArr) => {
                oldArr.forEach((obj, i) => {
                    oldArr[i].active = '';
                });
                oldArr[index] = { ...oldArr[index], active: 'active' };
                return [...oldArr];
            });
            setActiveIndex(index);
        }

        if (activeField) {
            changeFields((oldArr) => {
                oldArr.forEach((obj, i) => {
                    oldArr[i].active = '';
                });
                return [...oldArr];
            });
            setActiveIndex(undefined);
        }
    };

    return (
        <div className={`box-field ${field} ${active}`} onClick={clicked}>
            <BoxItem item={item} />
        </div>
    );
}
