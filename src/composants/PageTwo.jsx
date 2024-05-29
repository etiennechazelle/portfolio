import React, { useEffect, useRef, useState } from "react";
import Projet from "./Projet";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import climber from "../images/P3/climber.png";
import "../styles/PageTwo.scss";
import projets_data from "../data/projets";

gsap.registerPlugin(ScrollTrigger);

function PageTwo() {
  const pageTwoRef = useRef(null);
  const [projets, setProjets] = useState(projets_data.projets);
  const [projetsImages, setProjetsImages] = useState([]);
  const [IdProjetsVisible, setIdProjetsVisible] = useState(null);

  useEffect(() => {
    const imagesProjet = [];
    projets.forEach((projet) => {
      try {
        const image = require(`../images/data/projets/${projet.image}`);
        imagesProjet.push(image);
      } catch {
        console.error(`Image ${projet.image} not found`);
      }
    });
    setProjetsImages(imagesProjet);
  }, []);

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

  function handleProjetClick(id) {
    console.log("Projet clicked", id);
    setIdProjetsVisible(id);
  }

  const handleLeftArrowClick = () => {
    setIdProjetsVisible((prevId) => (prevId === 0 ? projets.length - 1 : prevId - 1));
    // animation pour l'apparition du projet
  };

  const handleRightArrowClick = () => {
    setIdProjetsVisible((prevId) => (prevId === projets.length - 1 ? 0 : prevId + 1));
  };

  return (
    <div className="PageTwo" ref={pageTwoRef}>
      <div className="background-3">
        <img src={climber} alt="Climber" />
      </div>
      <div className="content-2">
        <div className="content-2-header">
          <h2>projets</h2>
        </div>
        <div className="liste-projets">
          {projets.map((projet, index) => (
            <button
              className="btn-projet"
              style={{ backgroundImage: `url(${projetsImages[index]})` }}
              key={index}
              onClick={() => handleProjetClick(index)}
            ></button>
          ))}
        </div>
      </div>
      {IdProjetsVisible != null && (
        <div className="overlay">
          <div className="left-arrow" onClick={handleLeftArrowClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </div>
          <Projet projet={projets[IdProjetsVisible]} image={projetsImages[IdProjetsVisible.id]} />
          <div className="right-arrow" onClick={handleRightArrowClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
export default PageTwo;
