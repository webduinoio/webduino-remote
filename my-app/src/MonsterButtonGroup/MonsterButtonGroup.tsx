import React, { useState } from "react";
import MonsterButton from "../MonsterButton/MonsterButton";
import "./index.css";

function MonsterButtonGroup() {
  const monsterColorArray = ["green", "red", "yellow", "blue"];
  return (
    <div className="MonsterButtonGroup">
      {monsterColorArray.map((color) => (
        <MonsterButton monsterColor={color} />
      ))}
    </div>
  );
}

export default MonsterButtonGroup;
