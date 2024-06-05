import React, { useState } from "react";
import "../styles/Navbar.scss";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <h1 className={`${isOpen ? "show" : ""}`}>chz.</h1>
      <div className={`burgerButtonContainer  ${isOpen ? "show" : ""}`} onClick={toggleMenu}>
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}
      </div>
      <div className={`burgerContainer ${isOpen ? "show" : ""}`}>
        <ul>
          <li>
            <a href="#Parcours" onClick={toggleMenu}>
              parcours
            </a>
          </li>
          <li>
            <a href="#Projets" onClick={toggleMenu}>
              réalisations
            </a>
          </li>
          <li>
            <a href="#Contact" onClick={toggleMenu}>
              contact
            </a>
          </li>
        </ul>
      </div>
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
