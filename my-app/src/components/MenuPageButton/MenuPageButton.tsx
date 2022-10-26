import React, { useState } from "react";
import "./index.css";

interface Props {
  name: number;
}

function MenuPageButton({ name }: Props) {
  const [open, setOpen] = useState(false);
  const buttonAnim = () => {
    setOpen(!open);
    setTimeout(() => {
      setOpen(false);
    }, 100);
  };
  return (
    <div
      className={"MenuPageButton " + (open ? "MenuPageButton-click" : "")}
      onClick={() => buttonAnim()}
    >
      <p className="MenuPageButton-text">按鈕 {name}</p>
    </div>
  );
}
export default MenuPageButton;
