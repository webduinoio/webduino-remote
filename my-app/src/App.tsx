import React from 'react';
import { ReactComponent as Circle } from './images/circle.svg'
import './App.css';
import Hamburger from './src/Hamburger/Hamburger';
import Setting from './components/Setting/Setting';


function App() {
  return (
    <div className="App">
      <div className="App-Header">
        <Hamburger />
      </div>
      <Setting />
    </div>
  );
}

export default App;
