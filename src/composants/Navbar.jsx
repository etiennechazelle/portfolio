import React from 'react';
import '../styles/Navbar.scss';

function Navbar() {
    return (
        <nav>
            <h1>chz.</h1>
            <ul>
                <li className='circle'></li>
                <li><a href="#projects">réalisations</a></li>
                <li><a href="#contact">contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;