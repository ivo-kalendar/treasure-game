import { useEffect, useState } from 'react';
import BoxField from './BoxField';

export default function GameBox() {
    // Basic variables //
    const columns = [1, 2, 3, 4, 5, 6, 7];
    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let different = 6;
    // State variables //
    const [match, setMatch] = useState(['00']);
    const [fields, setFields] = useState([]);
    const [matchedFields, setMatchedFields] = useState([]);
    const [neighbors, setNeighbors] = useState({});
    const [activeIndex, setActiveIndex] = useState(undefined);

    //
    //
    // Execute Functions //
    useEffect(() => {
        makeFields();
        fillFields();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (match.length) {
            console.log(match);
            setMatch([]);
        } else {
            console.log(match, 'empty arr...');
        }
    }, [match]);

    useEffect(() => {
        setTimeout(() => {
            checkMatch();
        }, 100);
        // eslint-disable-next-line
    }, [fields]);

    useEffect(() => {
        makeEmptyFields();
        // eslint-disable-next-line
    }, [matchedFields, fields]);

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
                    let oldObj = fields.filter((obj) => obj.field === field);

                    !oldObj.length
                        ? emptyArr.push(emptyObj)
                        : emptyArr.push(...oldObj);
                });
            });

            setFields(emptyArr);
        }
    };

    //
    //
    //
    // Fill empty fields with items //
    const fillFields = () => {
        if (fields.length) {
            rows.reverse();
            rows.forEach((el) => {
                columns.forEach((e, i) => {
                    let field = `${el}${i + 1}`;
                    let element = `item-${Math.ceil(
                        Math.random() * different
                    )}`;
                    let newObj = { field, element, active: '' };
                    let oldObj = fields.filter(
                        (obj) => obj.element === 'empty'
                    );

                    if (oldObj.length) {
                        setFields((oldArr) => {
                            let index = fields.findIndex(
                                (el) => el.field === field
                            );
                            oldArr[index] = newObj;
                            return oldArr;
                        });
                    }
                });
            });
        }
    };

    //
    //
    //
    // Clear items from Matched fields //
    const makeEmptyFields = () => {
        if (matchedFields.length) {
            let arrMatch = [];
            let fieldArr = [];
            matchedFields.forEach((arr) => arrMatch.push(...arr));
            arrMatch.forEach((obj) => fieldArr.push(obj.field));
            let uniqueFields = [...new Set(fieldArr)];
            fields.forEach((obj, i) => {
                let newObj;
                uniqueFields.forEach((str) => {
                    if (obj.field === str) {
                        newObj = obj;
                        newObj.element = 'empty';
                    }
                });
                setFields((oldArr) => {
                    if (newObj) oldArr[i] = newObj;
                    return oldArr;
                });
            });
            setMatchedFields([]);
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
            setMatch(() => [...match, ...matchThree]);
            matchThree = [...new Set(matchThree)];
            fields.forEach((obj, i) => {
                let newObj;
                if (matchThree.includes(obj.field)) {
                    newObj = obj;
                    newObj.element = 'empty';
                    setMatchedFields(() => [...matchThree]);
                    // console.log(matchThree);
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

    return (
        <div
            //  ref={gameBoxRef}
            className='game-box'>
            {fields.map(({ field, element, active }, index) => (
                <BoxField
                    key={field}
                    field={field}
                    fields={fields}
                    item={element}
                    active={active}
                    matchedFields={matchedFields}
                    changeFields={setFields}
                    rows={rows}
                    columns={columns.length}
                    numberOfItems={different}
                    index={index}
                    neighbors={neighbors}
                    setNeighbors={setNeighbors}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            ))}
        </div>
    );
}
