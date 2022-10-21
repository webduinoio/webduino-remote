import React from "react";
import MenuPageButtonGroup from "../MenuPageButtonGroup/MenuPageButtonGroup";
import MenuPageInput from "../MenuPageInput/MenuPageInput";
import "./index.css";

function MenuPage() {
  return (
    <div className={"MenuPage"}>
      <MenuPageInput />
      <MenuPageButtonGroup />
    </div>
  );
}

export default MenuPage;
