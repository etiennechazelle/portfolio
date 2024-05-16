import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import backgroundImage from '../images/background.png';
import mountainsImage from '../images/P1/mountains.png';
import planeImage from '../images/P1/plane.png'
import '../styles/Home.scss';

function Home() {

    useEffect(() => {
        const plane = document.querySelector('.plane');
        console.log(plane)

        const planeTrail = document.querySelector('.plane-trail');

        // Animation plane
        gsap.to(plane, {
            duration: 5, // Durée de l'animation en secondes
            repeat: -1, // Répète l'animation en boucle
            motionPath: {
                path: '.path', // Sélecteur CSS du chemin de la courbe
                align: '.path', // Aligne l'élément avec le chemin
                autoRotate: true, // Rotation automatique selon la courbe
            },
        });


        // Animation plane trail
        gsap.to(planeTrail, {
            scaleX: 2, // Ajuste la largeur de la traînée de l'avion
            duration: 5, // Durée de l'animation en secondes
            ease: 'power1.inOut', // Easing pour une animation fluide
            repeat: -1, // Répète l'animation en boucle
        });
    }, []);

    return (
        <div className='Home' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <nav>
                <h1>chz.</h1>
                <ul>
                    <li className='circle'></li>
                    <li><a href="#projects">réalisations</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </nav>
            <div className="text-container">
                <h1>ETIENNE CHAZELLE</h1>
                <h2>DÉVELOPPEUR WEB</h2>
            </div>
            <div className="background">
                <img src={mountainsImage} alt="Mountains" />
            </div>
            <div className="plane-container">
                <img src={planeImage} alt="Plane" className='plane' />
                <div className="plane-trail"></div>
            </div>
            <svg width="1920" height="400" className='plane-path' style={{ zIndex: '-1' }}>
                <path class="path" d="M0,450 Q960,50 1920,150" fill="none" stroke="red" stroke-width="2" />
            </svg>

        </div>
    )
}

export default Home;