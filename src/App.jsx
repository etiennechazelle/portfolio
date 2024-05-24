import React from "react";
import "./App.scss";
import Home from "./composants/Home";
import PageOne from "./composants/PageOne";
import PageTwo from "./composants/PageTwo";
import PageThree from "./composants/PageThree";
import backgroundImage from "./images/background.png";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Home />
      <PageOne />
      <PageTwo />
      <PageThree />
    </div>
  );
}

export default App;
