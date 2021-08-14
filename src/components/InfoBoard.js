import { useState, useEffect } from 'react';
import { en, mk } from './info';

export default function InfoBoard({
    txtIndex,
    language,
    showInfoBoard,
    setShowInfoBoard,
}) {
    // State variables //
    const [infoText, setInfoText] = useState({ title: '', text: '' });
    const [jsonText, setJsonText] = useState(en);
    // Basic variables //
    let { title, text } = infoText;
    text = text.split('|');

    //
    //
    // Execute Functions //
    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!showInfoBoard) setInfoText({ title: '', text: '' });
        }, 1000);
        if (showInfoBoard) setInfoText(jsonText[txtIndex]);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [showInfoBoard]);

    useEffect(() => {
        if (language === 'en') setJsonText(en);
        if (language === 'mk') setJsonText(mk);
        // eslint-disable-next-line
    }, [language]);

    return (
        <div
            onClick={() => setShowInfoBoard(false)}
            className={`info${showInfoBoard ? '-board' : ''}`}
            style={{ height: window.innerHeight, width: window.innerWidth }}>
            <div>
                <h1>{title}</h1>
                {text.map((para, i) => (
                    <p
                        className={`${i === 0 && txtIndex && 'level-req'} ${
                            txtIndex && i !== 0 && 'tip'
                        } ${para.includes('Tip') && 'tips'} ${
                            para.includes('совет') && 'tips'
                        } ${txtIndex && text.length - 1 === i && 'last-tip'}`}
                        key={i}>
                        {para}
                    </p>
                ))}
            </div>
        </div>
    );
}
