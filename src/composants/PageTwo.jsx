import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import climber from "../images/P3/climber.png";
import "../styles/PageTwo.scss";
import projets_data from "../data/projets";

gsap.registerPlugin(ScrollTrigger);

function PageTwo() {
  const pageTwoRef = useRef(null);
  const [projets, setProjets] = useState(projets_data.projets);

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
      <div className="content-2">
        <div className="content-2-header">
          <h2>PROJETS</h2>
          <p>{projets.length}</p>
        </div>
        <div className="liste-projets">
          {projets.map((projet, index) => (
            <button className="btn-projet">
              <h3>{projet.nom}</h3>
              <p>{projet.date}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PageTwo;
