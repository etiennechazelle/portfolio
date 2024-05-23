import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mountainsImage from "../images/P2/mountains.png";
import personne from "../images/P2/personne.png";
import "../styles/PageOne.scss";

gsap.registerPlugin(ScrollTrigger);

function PageOne() {
  const [contentVisible, setContentVisible] = useState(false);
  const [activePointer, setActivePointer] = useState(null);
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const pageRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  const pointerStyles = [
    { top: "23.7%", left: "25.3%" },
    { top: "28.2%", left: "36.7%" },
    { top: "37.6%", left: "47.7%" },
  ];

  const handlePointerClick = (pointerId) => {
    setActivePointer(pointerId);
    setContentVisible(true);
    gsap.fromTo(contentRef.current, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power2.out" });
  };

  const exitContent = () => {
    setContentVisible(false);
    setActivePointer(null);
  };

  const updateContent = (newIndex, direction) => {
    const newContent = document.createElement("div");
    newContent.className = "content";

    gsap.to(".content", {
      duration: 0.5,
      x: direction === "left" ? -2000 : 2000,
      ease: "power2.in",
      onComplete: () => {
        const oldContent = document.querySelector(".content");
        if (oldContent) oldContent.remove();

        const newContentDetails = document.createElement("div");
        newContentDetails.className = "content-details";
        newContentDetails.innerHTML = `
          <div class="exit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <p>${newIndex}</p>`;

        newContent.appendChild(newContentDetails);
        document.querySelector(".content-container").appendChild(newContent);
        gsap.fromTo(
          newContent,
          { x: direction === "left" ? 2000 : -2000 },
          { duration: 0.5, x: 0, ease: "power2.out" }
        );
        newContent.querySelector(".exit").addEventListener("click", exitContent);
      },
    });
  };

  const handleLeftArrowClick = () => {
    const index = parseInt(activePointer.split("-")[1], 10);
    const newIndex = index === 0 ? pointerStyles.length - 1 : index - 1;
    setActivePointer("pointer-" + newIndex);
    updateContent(newIndex, "left");
  };

  const handleRightArrowClick = () => {
    const index = parseInt(activePointer.split("-")[1], 10);
    const newIndex = index === pointerStyles.length - 1 ? 0 : index + 1;
    setActivePointer("pointer-" + newIndex);
    updateContent(newIndex, "right");
  };

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

    updateImageHeight();

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const pageElement = pageRef.current;
    setContentVisible(false);

    gsap.to(".PageOne", {
      scrollTrigger: {
        trigger: pageElement,
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        markers: true,
      },
      scale: 1.5,
      opacity: 0,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="PageOne" ref={pageRef}>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        ))}
      </div>
      <div className="personne">
        <img src={personne} alt="Personne" />
      </div>
      {contentVisible && (
        <div className="content-container">
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
          <div className="content" ref={contentRef}>
            <div className="content-details">
              <p>{activePointer}</p>
            </div>
            <div className="exit" onClick={exitContent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
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

export default PageOne;
