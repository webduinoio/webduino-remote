import React, { useState } from 'react';
import './App.css';
import Hamburger from './components/Hamburger/Hamburger';
import Setting from './components/Setting/Setting';


function App() {
  const [hamburgerIsShow, setHamburgerIsShow] = useState(true)
  const handleHamburgerClick = () => {
    setHamburgerIsShow(!hamburgerIsShow)
  }
  return (
    <div className="App">
      <div className="App-Header">
        <Hamburger hamburgerIsShow={hamburgerIsShow} handleHamburgerClick={handleHamburgerClick} />
      </div>
      <div className='App-HamburgerSetting'>
        {
          hamburgerIsShow ? "" : <Setting />
        }
      </div>
    </div>
  );
}

export default App;
