import React from 'react';
import mountainsImage from '../images/P2/mountains.png';
import '../styles/PageOne.scss';

function PageOne() {
    return (
        <div className='PageOne'>
            <div className="background">
                <img src={mountainsImage} alt="Mountains" />
            </div>
        </div>
    )
}

export default PageOne;
