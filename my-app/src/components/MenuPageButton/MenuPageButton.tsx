import React, { useState } from "react";
import "./index.css";

interface Props {
  name: number;
}

function MenuPageButton({ name }: Props) {
  const [clicked, setClicked] = useState(false);
  const buttonAnim = () => {
    setClicked(!clicked);
    setTimeout(() => {
      setClicked(false);
    }, 100);
  };
  return (
    <div
      className={"MenuPageButton " + (clicked ? "MenuPageButton-click" : "")}
      onClick={() => buttonAnim()}
    >
      <p className="MenuPageButton-text">按鈕 {name}</p>
    </div>
  );
}
export default MenuPageButton;
