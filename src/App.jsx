import React, { useEffect, useRef } from 'react';
import { TimelineMax, Power4 } from 'gsap';
import './App.scss';
import Home from './composants/Home';
import PageOne from './composants/PageOne';
import backgroundImage from './images/background.png';

function App() {
  const frameRedRef = useRef(null);
  const frameBlackRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const $frameRed = frameRedRef.current;
    const $frameBlack = frameBlackRef.current;
    const $logo = logoRef.current;

    const tltransition = new TimelineMax({ paused: true })
      .fromTo($frameRed, 2.2, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: Power4.easeInOut })
      .fromTo($frameBlack, 2.2, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: Power4.easeInOut }, 0.2)
      .fromTo($logo, 1.6, { xPercent: -100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut }, 0.7)
      .set($frameRed, { scaleX: 0 })
      .to($frameBlack, 2.2, { scaleX: 0, transformOrigin: 'right', ease: Power4.easeInOut })
      .to($logo, 0.2, { autoAlpha: 0 }, '-=1.2');

    const playTransition = () => {
      tltransition.play(0);
    };

    return () => {
      playTransition();
    };
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Home onUnmount={() => { }} />
      <PageOne />
      <div className="page-transition">
        <div className="page-transition__red" ref={frameRedRef}></div>
        <div className="page-transition__black" ref={frameBlackRef}></div>
        <div className="transition__logo" ref={logoRef}>I'M LOGO</div>
      </div>
    </div>
  );
}

export default App;
