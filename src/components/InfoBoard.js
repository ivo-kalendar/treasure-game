import { useState, useEffect } from 'react';

export default function InfoBoard({ showInfoBoard, setShowInfoBoard }) {
    const [infoText, setInfoText] = useState({ title: '', text: '' });

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (!showInfoBoard) setInfoText({ title: '', text: '' });
        }, 1000);
        mountInfoBoard();

        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [showInfoBoard]);

    const { title, text } = infoText;

    const mountInfoBoard = () => {
        if (showInfoBoard) {
            setInfoText({
                title: 'Info Board',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Rerum eveniet voluptatibus sapiente impedit quis error accusantium sit illo ratione, cupiditate, hic officiis, odit illum id dicta? Debitis, neque delectus. Consequatur dignissimos eveniet autem explicabo debitis laborum exercitationem accusamus facilis dolore?',
            });
        }
    };

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
