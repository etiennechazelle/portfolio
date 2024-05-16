import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.scss";
import Home from "./composants/Home";
import PageOne from "./composants/PageOne";
import backgroundImage from "./images/background.png";

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".Home", {
      scrollTrigger: {
        trigger: ".App",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
      },
      scale: 15,
      opacity: 0,
    });
  }, []);

  

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Home />
      <PageOne />
    </div>
  );
}

export default App;
