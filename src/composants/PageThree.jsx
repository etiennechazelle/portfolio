import React, { useEffect, useRef, useState } from "react";
import "../styles/PageThree.scss";
import summit from "../images/P4/summit.png";
import flag_1 from "../images/P4/flag-1.png";
import flag_2 from "../images/P4/flag-2.png";
import flag_3 from "../images/P4/flag-3.png";

function PageThree() {
  const [flagDisplayedId, setFlagDisplayedId] = useState(1);
  const flag1 = useRef(null);
  const flag2 = useRef(null);
  const flag3 = useRef(null);

  useEffect(() => {
    const flag1Element = flag1.current;
    const flag2Element = flag2.current;
    const flag3Element = flag3.current;

    if (flag1Element && flag2Element && flag3Element) {
      if (flagDisplayedId === 1) {
        flag1Element.style.display = "block";
        flag2Element.style.display = "none";
        flag3Element.style.display = "none";
      } else if (flagDisplayedId === 2) {
        flag1Element.style.display = "none";
        flag2Element.style.display = "block";
        flag3Element.style.display = "none";
      } else {
        flag1Element.style.display = "none";
        flag2Element.style.display = "none";
        flag3Element.style.display = "block";
      }
    }

    const interval = setInterval(() => {
      setFlagDisplayedId((prevId) => (prevId === 3 ? 1 : prevId + 1));
    }, 200);

    return () => clearInterval(interval);
  }, [flagDisplayedId]);

  return (
    <div className="PageThree">
      <div className="background-4">
        <img src={summit} alt="Summit" />
        <img src={flag_1} alt="Flag 1" ref={flag1} />
        <img src={flag_2} alt="Flag 2" ref={flag2} />
        <img src={flag_3} alt="Flag 3" ref={flag3} />
      </div>
    </div>
  );
}

export default PageThree;
