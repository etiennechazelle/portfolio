import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/PageThree.scss";
import summit from "../images/P4/summit.png";
import cv from "../data/CV_ETIENNE_CHAZELLE.pdf";
import flags from "../images/P4/flags.gif";

gsap.registerPlugin(ScrollTrigger);

function PageThree() {
  useEffect(() => {
    gsap.to(".liens-4", {
      scrollTrigger: {
        trigger: ".background-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      opacity: 1,
    });
  }, []);

  return (
    <div className="PageThree" id="Contact">
      <div className="background-4">
        <img src={summit} alt="Summit" style={{ zIndex: "2" }} />
        <img src={flags} alt="Flags" style={{ zIndex: "1" }} />
      </div>
      <div className="liens-4" style={{ opacity: 0 }}>
        <a href="https://www.linkedin.com/in/%C3%A9tienne-chazelle-18a448268/">LinkedIn</a>
        <a href="https://github.com/etiennechazelle/">GitHub</a>
        <a href="mailto:etiennechazelle38@gmail.com">Mail</a>
        <a href={cv} download>
          CV
        </a>
      </div>
    </div>
  );
}

export default PageThree;
