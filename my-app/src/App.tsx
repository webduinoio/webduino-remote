import React, { useRef, useState } from "react";
import "./App.css";
import { ReactComponent as Circle } from "./images/circle.svg";
import { ReactComponent as AiCar1 } from "./images/aicar1.svg";
import { ReactComponent as AiCar2 } from "./images/aicar2.svg";
function App() {
  const KebbiRef: any = useRef(null);
  const [isKebbiClick, setIsKebbiClick] = useState(false);
  const [kebbiOriginPosition, setKebbiOriginPosition] = useState({
    left: 0,
    top: 0,
  });
  const [kebbiPosition, setKebbiPosition] = useState({
    left: 0,
    top: 0,
  });
  const mousemoveHandler = (e: any) => {
    if (isKebbiClick) {
      setKebbiPosition({
        left: e.pageX - kebbiOriginPosition.left,
        top: e.pageY - kebbiOriginPosition.top,
      });
    }
  };
  const mouseupHandler = () => {
    setKebbiPosition({ left: 0, top: 0 });
    setIsKebbiClick(false);
  };
  const mousedownHandler = (e: any) => {
    setKebbiOriginPosition({ left: e.pageX, top: e.pageY });
    setIsKebbiClick(true);
  };
  return (
    <div className="App">
      <div className="App-Header"></div>
      <div className="App-KebbiSection">
        <div
          className="App-ImageKebbiContainer"
          ref={KebbiRef}
          onMouseDown={(e) => mousedownHandler(e)}
          onMouseMove={(e) => mousemoveHandler(e)}
          onMouseUp={() => mouseupHandler()}
        >
          {isKebbiClick ? (
            <AiCar2
              className="App-ImageKebbiSelf"
              style={{ left: kebbiPosition.left, top: kebbiPosition.top }}
            />
          ) : (
            <AiCar1 className="App-ImageKebbiSelf" />
          )}
        </div>
        <div className="App-CircleSection">
          <Circle />
        </div>
      </div>
    </div>
  );
}

export default App;
