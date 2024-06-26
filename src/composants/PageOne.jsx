import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mountainsImage from "../images/P2/mountains.png";
import personne from "../images/P2/personne.png";
import "../styles/PageOne.scss";
import formationsData from "../data/formations.json";

gsap.registerPlugin(ScrollTrigger);

function PageOne() {
  const [imageHeight, setImageHeight] = useState(0);
  const [formations, setFormations] = useState(formationsData.formations);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const imageRef = useRef(null);
  const pageRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const pointerStyles = [
    { top: "34.5%", left: "25.3%" },
    { top: "38.5%", left: "36.7%" },
    { top: "46.5%", left: "47.7%" },
  ];

  const colorChangeDelay = [1.6, 1.55, 2.5];

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
    const path = document.getElementById("climber-path");
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const timeline = gsap.timeline();

    timeline.to(path, {
      duration: 8,
      strokeDashoffset: 0,
      ease: "power2.inOut",
    });

    timeline.pause();

    const pageOne = pageRef.current;

    gsap.to(".PageOne", {
      scrollTrigger: {
        trigger: pageOne,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onEnter: () => {
          timeline.play();
          document.querySelectorAll(".pointer").forEach((pointer, i) => {
            gsap.to(pointer, {
              ease: "power1.in",
              delay: colorChangeDelay[i],
              backgroundColor: formations[2].color,
            });
          });
        },
      },
    });

    gsap.to(".PageOne", {
      scrollTrigger: {
        trigger: pageOne,
        start: "80% 75%",
        end: "bottom 50%",
        scrub: true,
        pin: true,
      },
      scale: 1.5,
      opacity: 0,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handlePointerHover = (index) => {
    const pointer = document.getElementById("pointer-" + index);
    const svg = pointer.querySelector("svg");
    gsap.to(pointer, {
      backgroundColor: formations[index].background_color,
      duration: 0.1,
    });
    gsap.to(svg, {
      stroke: formations[index].color,
      duration: 0.1,
    });
    setActiveTooltip(index);
  };

  const handlePointerLeave = (index) => {
    const pointer = document.getElementById("pointer-" + index);
    const svg = pointer.querySelector("svg");
    gsap.to(pointer, {
      backgroundColor: formations[2].color,
      duration: 0.1,
    });
    gsap.to(svg, {
      stroke: "currentColor",
      duration: 0.1,
    });
    setActiveTooltip(null);
  };

  return (
    <div className="PageOne" ref={pageRef} id="Parcours">
      <div className="background-2">
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            id="climber-path"
            d="M435 841.5C466.333 842.833 514 846.5 606 845C678.506 843.818 595.5 854 529 866.5C462.5 879 738.5 891 818.5 908C898.5 925 795.5 917 683.5 933.5C571.5 950 762 942.5 965 977.5C1482.5 1043.5 1493 1007 1709 1043.5C1881.8 1072.7 1920 1080 1920 1080M819 801.5C956.5 791.5 1045.5 754 998 748C950.5 742 866.5 738.5 899.5 727.5C932.5 716.5 1006 709.5 995 697.5C984 685.5 877.5 669 912.5 663.5C947.5 658 1009.5 680.5 968 657C926.5 633.5 892 623.5 919 622C946 620.5 990 612.5 964 607.5C938 602.5 900.5 599.5 919 593.5C937.5 587.5 968.5 580 947.5 574.5C926.5 569 909.5 562.5 922.5 556.5C935.5 550.5 938 537.5 927.5 521.5M1036.5 609.5C1054 603.5 1071 593 1050 591.5C1033.2 590.3 1017 589.333 1011 589M905.5 589.5C810.5 565 809 563 780 535C751 507 759.5 494 750 495.5C740.5 497 714 504 722 495.5C730 487 746 485.5 734 480C722 474.5 716 472 717.5 465C719 458 729.5 479 722 456.5C717.629 443.386 715.823 437.084 715.229 434.5C715.008 433.537 714.955 433.09 715 433M713.5 465C656.5 458.5 556 450.5 578 445.5C600 440.5 652 417.5 598.5 431.5C545 445.5 514.5 446.5 512 435.5C509.5 424.5 512 415 501.5 412.5C491 410 488 408 492.5 406C497 404 503.5 406.5 500 402C497.2 398.4 494.833 393.167 494 391C493 390 376.5 211 189.5 108.5C39.9 26.5 0.833333 2 0 0"
            stroke="url(#paint0_linear_158_10)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_158_10"
              x1="960.516"
              y1="0"
              x2="960.516"
              y2="1080"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#185997" stopOpacity="0" />
              <stop offset="0.357213" stopColor="#1C5C99" stopOpacity="0" />
              <stop offset="0.362339" stopColor="#24629E" stopOpacity="0.789884" />
              <stop offset="0.741072" stopColor="#336DA5" stopOpacity="0" />
              <stop offset="0.807047" stopColor="#356FA6" stopOpacity="0.5" />
              <stop offset="0.902425" stopColor="#356FA6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <img ref={imageRef} src={mountainsImage} alt="Mountains" />
      </div>
      <div className="pointers" style={{ height: imageHeight + "px" }}>
        {pointerStyles.map((style, i) => (
          <div
            key={i}
            className="pointer"
            id={"pointer-" + i}
            style={{ position: "absolute", ...style, backgroundColor: "#e6ecff" }}
            onMouseEnter={() => handlePointerHover(i)}
            onMouseLeave={() => handlePointerLeave(i)}
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
            {activeTooltip === i && (
              <div
                className={`tooltip ${isMobile ? "mobile-tooltip" : ""}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "100%",
                  transform: `translate(${i === 0 || i === 1 || isMobile ? "-200px" : "10px"}, ${
                    i === 0 || i === 1 || isMobile ? "50%" : "42%"
                  })`,
                  color: formations[i].color,
                  backgroundColor: formations[i].background_color,
                }}
              >
                <h2>
                  {formations[i].date.split("-").map((date, j) => (
                    <p key={i}>{date}</p>
                  ))}
                </h2>
                <p className="etablissement">{formations[i].etablissement + " (" + formations[i].lieu + ")"}</p>
                <p className="type-formation">{formations[i].type}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="personne">
        <img src={personne} alt="Personne" />
      </div>
    </div>
  );
}

export default PageOne;
