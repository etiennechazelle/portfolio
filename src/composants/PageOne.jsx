import React, { useState } from 'react';
import mountainsImage from '../images/P2/mountains.png';
import personne from '../images/P2/personne.png';
import '../styles/PageOne.scss';

function PageOne() {
    const [contentVisible, setContentVisible] = useState(false);
    const [activePointer, setActivePointer] = useState(null);

    const handlePointerClick = (pointerId) => {
        setActivePointer(pointerId);
        setContentVisible(true);
    };

    const exitContent = () => {
        setContentVisible(false);
        setActivePointer(null);
    };

    // Pointers positions depending of the size of the background image
    const pointerStyles = [
        { top: '15%', left: '10%' },
        { top: '25%', left: '35%' },
        { top: '40%', left: '70%' },
    ];

    return (
        <div className="PageOne">
            <div className="background-2">
                <img src={mountainsImage} alt="Mountains" />
            </div>
            <div className="pointers">
                {
                    pointerStyles.map((style, i) => (
                        <div
                            key={i}
                            className="pointer"
                            id={"pointer-" + i}
                            style={{ position: 'absolute', ...style }}
                            onClick={() => handlePointerClick("pointer-" + i)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    ))
                }
            </div>
            <div className="personne">
                <img src={personne} alt="Personne" />
            </div>
            {contentVisible && (
                <div className="content">
                    <div className="exit" onClick={exitContent}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div className="content-details">
                        <p>{activePointer}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageOne;
