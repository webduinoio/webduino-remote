import React from "react";
import "./App.css";
import MonsterButtonGroup from "./MonsterButtonGroup/MonsterButtonGroup";

function App() {
  return (
    <div className="App">
      <div className="App-Header"></div>
      <div className="App-Monster">
        <MonsterButtonGroup />
      </div>
    </div>
  );
}

export default App;
