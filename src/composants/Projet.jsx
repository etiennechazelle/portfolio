import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Projet.scss";

gsap.registerPlugin(ScrollTrigger);

function Projet({ projet }) {
  const image = require(`../images/data/projets/${projet.image}`);
  const technologies = projet.technologie.split(", ");
  const projetContentRef = useRef(null);

  const imagesProjet = Array.from({ length: projet.nbImages }, (_, i) =>
    require(`../images/data/projets/${projet.nom
      .replace(/ /g, "-")
      .toLowerCase()}/${i + 1}.png`)
  );

  return (
    <div className="Projet">
      <div className="header-image-container">
        <img src={image} alt={projet.title} className="header-image" />
      </div>
      <div className="projet-content" ref={projetContentRef}>
        <div className="projet-content-header">
          <h2 style={{ color: projet.color }}>{projet.nom}</h2>
          <h2 style={{ color: projet.color }}>{projet.date}</h2>
        </div>
        <div
          className="separation"
          style={{ borderTop: `4px solid #E2EAFF`, margin: "1em 0px" }}
        ></div>
        <div className="projet-content-techno">
          {technologies.map((techno, index) => (
            <span key={index} style={{ backgroundColor: projet.color }}>
              {techno}
            </span>
          ))}
        </div>
        <div
          className="separation"
          style={{ borderTop: `4px solid #E2EAFF`, margin: "1em 0px" }}
        ></div>
        <p className="projet-content-description">{projet.description}</p>
        <div className="projet-images-container">
          {imagesProjet.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Projet ${projet.nom} ${index + 1}`}
            />
          ))}
          {projet.video && (
            <video controls>
              <source
                src={require(`../videos/${projet.video}`)}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projet;
