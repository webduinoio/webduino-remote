import React from "react";
import "./index.css";

interface Props {
  hamburgerShow: boolean;
  onClick: () => void;
}
function Hamburger({ hamburgerShow, onClick }: Props) {
  return (
    <div
      className={"Hamburger " + (hamburgerShow ? "" : "active")}
      onClick={onClick}
    >
      <span className="Hamburger-line"></span>
      <span className="Hamburger-line"></span>
      <span className="Hamburger-line"></span>
    </div>
  );
}

export default Hamburger;
