import React from "react";
import "./App.scss";
import Home from "./composants/Home";
import PageOne from "./composants/PageOne";
import PageTwo from "./composants/PageTwo";
import backgroundImage from "./images/background.png";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Home />
      <PageOne />
      <PageTwo />
    </div>
  );
}

export default App;
