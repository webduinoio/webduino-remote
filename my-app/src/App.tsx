import React, { useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import MenuPage from "./components/MenuPage/MenuPage";

function App() {
  const [menuIsShow, setMenuIsShow] = useState(true);
  const handleOnClick = () => {
    setMenuIsShow(!menuIsShow);
  };
  return (
    <div className="App">
      <div className="App-Header">
        <Menu menuIsShow={menuIsShow} handleOnClick={handleOnClick} />
      </div>
      <div className="App-Content">{menuIsShow ? <></> : <MenuPage />}</div>
    </div>
  );
}

export default App;
