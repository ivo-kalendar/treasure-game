import { BsStar, BsStarFill } from 'react-icons/bs';

export default function Stars({ stars }) {
    //
    //
    // Styles //
    const bsStarStyle = {
        transform: 'translate(0%, 10%) scale(1.1)',
        margin: '0 0.3rem',
    };
    const bsFillStyle = {
        transform: 'translate(0%, 10%) scale(1)',
        color: 'gold',
        position: 'absolute',
        margin: '0 0.3rem',
    };
    const starsStyle = { marginLeft: '0.5rem' };

    return (
        <span style={starsStyle}>
            <span>
                {stars !== 0 && <BsStarFill style={bsFillStyle} />}{' '}
                <BsStar style={bsStarStyle} />{' '}
            </span>
            <span>
                {stars > 1 && <BsStarFill style={bsFillStyle} />}{' '}
                <BsStar style={bsStarStyle} />{' '}
            </span>
            <span>
                {stars > 2 && <BsStarFill style={bsFillStyle} />}{' '}
                <BsStar style={bsStarStyle} />
            </span>
        </span>
    );
}
