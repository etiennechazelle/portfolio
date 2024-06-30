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

  // animate the scroll down div up and down
  useEffect(() => {
    const scrollDownDiv = document.querySelector(".scroll-down-div");

    gsap.to(scrollDownDiv, {
      y: 5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
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
        <path className="path" d="M0,350 Q960,50 1920,150" fill="none" stroke="white" strokeWidth={2} />
      </svg>
      <div className="scroll-down-div">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
        </div>
    </div>
  );
}

export default Home;
