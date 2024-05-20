import React, { useEffect, useRef, useState } from "react";
import mountainsImage from "../images/P2/mountains.png";
import personne from "../images/P2/personne.png";
import "../styles/PageOne.scss";

function PageOne() {
  const [contentVisible, setContentVisible] = useState(false);
  const [activePointer, setActivePointer] = useState(null);
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef(null);

  const handlePointerClick = (pointerId) => {
    setActivePointer(pointerId);
    setContentVisible(true);
  };

  const exitContent = () => {
    setContentVisible(false);
    setActivePointer(null);
  };

  // Pointers positions depending on the size of the background image
  const pointerStyles = [
    { top: "23.7%", left: "25.3%" },
    { top: "28.2%", left: "36.7%" },
    { top: "37.6%", left: "47.7%" },
  ];

  // Update the height of the pointers div when the image height changes
  useEffect(() => {
    const updateImageHeight = () => {
      if (imageRef.current) {
        setImageHeight(imageRef.current.clientHeight);
      }
    };

    const observer = new ResizeObserver(updateImageHeight);
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Initial update
    updateImageHeight();

    // Cleanup on component unmount
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="PageOne">
      <div className="background-2">
        <img ref={imageRef} src={mountainsImage} alt="Mountains" />
      </div>
      <div className="pointers" style={{ height: imageHeight + "px" }}>
        {pointerStyles.map((style, i) => (
          <div
            key={i}
            className="pointer"
            id={"pointer-" + i}
            style={{ position: "absolute", ...style }}
            onClick={() => handlePointerClick("pointer-" + i)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        ))}
      </div>
      <div className="personne">
        <img src={personne} alt="Personne" />
      </div>
      {contentVisible && (
        <div className="content">
          <div className="exit" onClick={exitContent}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div className="left-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div className="right-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
          <div className="content-details">
            <p>{activePointer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageOne;
