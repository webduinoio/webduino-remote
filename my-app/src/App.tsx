import React from 'react';
import { ReactComponent as Circle } from './images/circle.svg'
import './App.css';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div className="App">
      <div className="App-Header">
        <Menu />
      </div>
    </div>
  );
}

export default App;
