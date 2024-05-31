import React from "react";
import "../styles/Navbar.scss";

function Navbar() {
  return (
    <nav>
      <h1>chz.</h1>
      <ul>
        <li className="circle"></li>
        <li>
          <a href="#Parcours">parcours</a>
        </li>
        <li>
          <a href="#Projets">réalisations</a>
        </li>
        <li>
          <a href="#Contact">contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
