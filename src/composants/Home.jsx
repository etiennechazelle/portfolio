import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import mountainsImage from "../images/P1/mountains.png";
import planeImage from "../images/P1/plane.png";
import "../styles/Home.scss";
import Navbar from "./Navbar";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

function Home() {
  const homeRef = useRef(null);

  useEffect(() => {
    const plane = document.querySelector(".plane");
    const path = document.querySelector(".path");

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const duration = 100;

    gsap.to(plane, {
      duration: duration,
      repeat: 0,
      motionPath: {
        path: ".path",
        align: ".path",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      ease: "none",
    });

    gsap.to(path, {
      duration: duration,
      repeat: 0,
      strokeDashoffset: 0,
      delay: 0.5,
      ease: "none",
    });
  }, []);

  useEffect(() => {
    const homeElement = homeRef.current;

    gsap.to(".background", {
      scrollTrigger: {
        trigger: homeElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onEnter: () => window.scrollTo(0, 0),
        onLeaveBack: () => window.scrollTo(0, 0),
      },
      scale: 3,
      opacity: 0,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="Home" ref={homeRef}>
      <Navbar />
      <div className="text-container">
        <h1>ETIENNE CHAZELLE</h1>
        <h2>DÉVELOPPEUR WEB</h2>
      </div>
      <div className="background">
        <img src={mountainsImage} alt="Mountains" />
      </div>
      <div className="plane-container">
        <img src={planeImage} alt="Plane" className="plane" />
      </div>
      <svg width="1920" height="400" className="plane-path" style={{ opacity: 0.5 }}>
        <path className="path" d="M0,450 Q960,50 1920,150" fill="none" stroke="white" strokeWidth={2} />
      </svg>
    </div>
  );
}

export default Home;
