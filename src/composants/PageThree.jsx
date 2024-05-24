import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/PageThree.scss";
import summit from "../images/P4/summit.png";
import flag_1 from "../images/P4/flag-1.png";
import flag_2 from "../images/P4/flag-2.png";
import flag_3 from "../images/P4/flag-3.png";

function PageThree() {
  return (
    <div className="PageThree">
      <div className="background-4">
        <img src={summit} alt="Summit" />
        <img src={flag_1} alt="Flag 1" />
        <img src={flag_2} alt="Flag 2" />
        <img src={flag_3} alt="Flag 3" />
      </div>
    </div>
  );
}

export default PageThree;
