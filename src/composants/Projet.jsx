import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Projet.scss";

gsap.registerPlugin(ScrollTrigger);

function Projet({ projet }) {
  const image = require(`../images/data/projets/${projet.image}`);
  const technologies = projet.technologie.split(", ");
  const projetContentRef = useRef(null);
  const progressCircleRef = useRef(null);

  const imagesProjet = Array.from({ length: 2 }, (_, i) =>
    require(`../images/data/projets/${projet.nom.replace(/ /g, "-").toLowerCase()}/${i + 1}.png`)
  );

  useEffect(() => {
    if (projetContentRef.current && progressCircleRef.current) {
      const contentElement = projetContentRef.current;
      const circleElement = progressCircleRef.current;

      ScrollTrigger.create({
        trigger: contentElement,
        scroller: contentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress.toFixed(3) * 100;
          const gradient = `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${projet.color} ${progress}%, pink 0)`;
          gsap.to(circleElement, {
            background: gradient,
            duration: 0.1,
            ease: "none",
          });
        },
      });
    }
  }, [projet.color]);

  return (
    <div className="Projet">
      <img src={image} alt={projet.title} className="header-image" />
      <div className="projet-content" ref={projetContentRef}>
        <div className="projet-content-header">
          <h2 style={{ color: projet.color }}>{projet.nom}</h2>
          <h2 style={{ color: projet.color }}>{projet.date}</h2>
        </div>
        <div className="separation" style={{ borderTop: `4px solid #E2EAFF`, margin: "1em 0px" }}></div>
        <div className="projet-content-techno">
          {technologies.map((techno, index) => (
            <span key={index} style={{ backgroundColor: projet.color }}>
              {techno}
            </span>
          ))}
        </div>
        <div className="separation" style={{ borderTop: `4px solid #E2EAFF`, margin: "1em 0px" }}></div>
        <p className="projet-content-description">{projet.description}</p>
        <div className="projet-images-container">
          {imagesProjet.map((image, index) => (
            <img key={index} src={image} alt={`Projet ${projet.nom} ${index + 1}`} />
          ))}
        </div>
      </div>
      <div
        className="progress-circle"
        ref={progressCircleRef}
        style={{
          background:
            "radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(hotpink 0%, pink 0)",
        }}
      >
        <progress value="75" min="0" max="100" style={{ visibility: "hidden", height: "0", width: "0" }}></progress>
      </div>
    </div>
  );
}

export default Projet;
