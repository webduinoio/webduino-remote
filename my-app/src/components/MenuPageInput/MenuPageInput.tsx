import React from "react";
import "./index.css";

function MenuPageInput() {
  return (
    <div className="MenuPageInput">
      <input
        type="text"
        className="MenuPageInput-input"
        placeholder="輸入文字"
      />
      <button className="MenuPageInput-button">傳送</button>
    </div>
  );
}

export default MenuPageInput;
