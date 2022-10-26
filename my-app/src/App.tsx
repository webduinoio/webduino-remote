import React, { useState } from "react";
import "./App.css";
import Hamburger from "./components/Hamburger/Hamburger";
import Setting from "./components/Setting/Setting";

function App() {
  const [hamburgerShow, setHamburgerHidden] = useState(true);
  const handleHamburgerClick = () => {
    setHamburgerHidden(!hamburgerShow);
  };
  return (
    <div className="App">
      <div className="App-Header">
        <Hamburger
          hamburgerShow={hamburgerShow}
          onClick={handleHamburgerClick}
        />
      </div>
      <div className="App-HamburgerSetting">
        {hamburgerShow ? "" : <Setting />}
      </div>
    </div>
  );
}

export default App;
