import React from "react";
import MenuPageButton from "../MenuPageButton/MenuPageButton";
import "./index.css";

function MenuPageButtonGroup() {
  return (
    <div className="MenuPageButtonGroup">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
        <MenuPageButton key={value} name={value} />
      ))}
    </div>
  );
}

export default MenuPageButtonGroup;
