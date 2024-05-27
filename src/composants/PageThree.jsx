import React, { useEffect, useRef, useState } from "react";
import "../styles/PageThree.scss";
import summit from "../images/P4/summit.png";

const flagImages = Array.from({ length: 28 }, (_, i) => require(`../images/P4/flags/flag${i + 1}.png`));

function PageThree() {
  const [flagDisplayedId, setFlagDisplayedId] = useState(1);
  const flagRefs = useRef([]);

  useEffect(() => {
    const totalFlags = flagImages.length;
    flagRefs.current.forEach((flag, index) => {
      if (flag) {
        flag.style.display = index + 1 === flagDisplayedId ? "block" : "none";
      }
    });

    const interval = setInterval(() => {
      setFlagDisplayedId((prevId) => (prevId === totalFlags ? 1 : prevId + 1));
    }, 75);

    return () => clearInterval(interval);
  }, [flagDisplayedId]);

  return (
    <div className="PageThree">
      <div className="background-4">
        <img src={summit} alt="Summit" style={{ zIndex: "2" }} />
        {flagImages.map((flagImage, index) => (
          <img
            key={index}
            src={flagImage}
            alt={`Flag ${index + 1}`}
            ref={(el) => (flagRefs.current[index] = el)}
            style={{ zIndex: "1" }}
          />
        ))}
      </div>
    </div>
  );
}

export default PageThree;
