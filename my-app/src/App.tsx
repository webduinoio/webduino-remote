import React, { useRef, useState } from "react";
import "./App.css";
import { ReactComponent as Circle } from "./images/circle.svg";
import { ReactComponent as AiCar1 } from "./images/aicar1.svg";
import { ReactComponent as AiCar2 } from "./images/aicar2.svg";
function App() {
  const KebbiRef:any = useRef(null);
  const [isKebbiClick, setIsKebbiClick] = useState(false);
  const [kebbiPosition, setKebbiPosition] = useState({
    left: 0,
    top: 0,
  });
  const mousemoveHandler = (e: any) => {
   
      setKebbiPosition({ left: e.pageX-KebbiRef.current.offsetLeft, top: e.pageY-KebbiRef.current.offsetTop });
      console.log(e.pageX,KebbiRef.current.offsetLeft);
            
    
  };
  const mouseupHandler = () => {
    setIsKebbiClick(false);
  };
  const mousedownHandler = () => {
    setIsKebbiClick(true);
  };
  return (
    <div className="App">
      <div className="App-Header"></div>
      <div className="App-KebbiSection">
        <div
          className="App-ImageKebbiContainer"
          ref = {KebbiRef}
          onMouseDown={() => mousedownHandler()}
          
          style={{ left: kebbiPosition.left, top: kebbiPosition.top }}
          >
          {isKebbiClick ? <AiCar2 onMouseUp={() => mouseupHandler()}
          onMouseMove={(e) => mousemoveHandler(e)}/> : <AiCar1 className="App-ImageKebbiSelf"  />}
         
        </div>
        <div className="App-CircleSection">
          <Circle />
        </div>
      </div>
    </div>
  );
}

export default App;
