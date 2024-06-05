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
  const projetRef = useRef(null);
  const isAnimatingRef = useRef(false);

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
  }, [projets]);

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

  const handleProjetClick = (id) => {
    if (isAnimatingRef.current) return;
    setIdProjetsVisible(id);
    document.body.classList.add("no-scroll");
  };

  const handleCloseOverlay = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIdProjetsVisible(null);
    document.body.classList.remove("no-scroll");
  };

  const handleLeftArrowClick = () => {
    if (isAnimatingRef.current) return;
    animateTransition("left");
  };

  const handleRightArrowClick = () => {
    if (isAnimatingRef.current) return;
    animateTransition("right");
  };

  const animateTransition = (direction) => {
    isAnimatingRef.current = true;
    const tl = gsap.timeline();

    tl.to(".Projet", {
      duration: 0.5,
      x: direction === "left" ? "200%" : "-200%",
      opacity: 0,
    })
      .add(() => {
        let newId;
        if (direction === "left") {
          newId = IdProjetsVisible === 0 ? projets.length - 1 : IdProjetsVisible - 1;
        } else {
          newId = IdProjetsVisible === projets.length - 1 ? 0 : IdProjetsVisible + 1;
        }
        setIdProjetsVisible(newId);
      })
      .set(".Projet", { x: direction === "left" ? "-200%" : "200%", opacity: 0 })
      .to(".Projet", {
        duration: 0.5,
        x: 0,
        opacity: 1,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
  };

  const getPrevProjectIndex = (index) => {
    return index === 0 ? projets.length - 1 : index - 1;
  };

  const getNextProjectIndex = (index) => {
    return index === projets.length - 1 ? 0 : index + 1;
  };

  const prevProjectIndex = IdProjetsVisible != null ? getPrevProjectIndex(IdProjetsVisible) : null;
  const nextProjectIndex = IdProjetsVisible != null ? getNextProjectIndex(IdProjetsVisible) : null;

  useEffect(() => {
    const overlay = document.querySelector(".Projet");
    let startX = 0;
    let currentX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      currentX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX - currentX > 50) {
        handleRightArrowClick();
      } else if (currentX - startX > 50) {
        handleLeftArrowClick();
      }
    };

    if (overlay) {
      overlay.addEventListener("touchstart", handleTouchStart);
      overlay.addEventListener("touchmove", handleTouchMove);
      overlay.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("touchstart", handleTouchStart);
        overlay.removeEventListener("touchmove", handleTouchMove);
        overlay.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [IdProjetsVisible]);

  return (
    <div className="PageTwo" ref={pageTwoRef} id="Projets">
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
          <div className="exit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={(e) => handleCloseOverlay(e)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div
            className="left-arrow"
            onClick={handleLeftArrowClick}
            style={{ color: prevProjectIndex != null ? projets[prevProjectIndex].color : "inherit" }}
          >
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
          <div className="projet-container">
            <Projet ref={projetRef} projet={projets[IdProjetsVisible]} image={projetsImages[IdProjetsVisible]} />
          </div>
          <div
            className="right-arrow"
            onClick={handleRightArrowClick}
            style={{ color: nextProjectIndex != null ? projets[nextProjectIndex].color : "inherit" }}
          >
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
