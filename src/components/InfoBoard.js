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
    const { title, text } = infoText;

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
                <p>{text}</p>
            </div>
        </div>
    );
}
