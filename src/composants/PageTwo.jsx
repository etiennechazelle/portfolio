import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import climber from "../images/P3/climber.png";
import "../styles/PageTwo.scss";

gsap.registerPlugin(ScrollTrigger);

function PageTwo() {
  const pageTwoRef = useRef(null);
  useEffect(() => {
    const pageTwo = pageTwoRef.current;
    gsap.to(".background-3", {
      scrollTrigger: {
        trigger: pageTwo,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
      },
      left: 0,
    });

    gsap.to(".PageTwo", {
      scrollTrigger: {
        trigger: pageTwo,
        start: "75% 75%",
        end: "bottom 50%",
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <div className="PageTwo" ref={pageTwoRef}>
      <div className="background-3">
        <img src={climber} alt="Climber" />
      </div>
    </div>
  );
}
export default PageTwo;
