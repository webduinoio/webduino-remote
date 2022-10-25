import React, { useState } from "react";
import { ReactComponent as GreenMonsterImage } from "../images/greenMonster.svg";
import { ReactComponent as RedMonsterImage } from "../images/redMonster.svg";
import { ReactComponent as YellowMonsterImage } from "../images/yellowMonster.svg";
import { ReactComponent as BlueMonsterImage } from "../images/blueMonster.svg";
import "./index.css";
interface Props {
  monsterColor: string;
}
function MonsterButton({ monsterColor }: Props) {
  const [monsterClick, setMonsterClick] = useState(false);
  const handleMonsterClick = () => {
    setMonsterClick(true);
    setTimeout(() => setMonsterClick(false), 100);
  };
  const renderMonster = (monsterColor: string) => {
    switch (monsterColor) {
      case "green":
        return <GreenMonsterImage />;
      case "red":
        return <RedMonsterImage />;
      case "yellow":
        return <YellowMonsterImage />;
      case "blue":
        return <BlueMonsterImage />;
      default:
        return <></>;
    }
  };
  return (
    <div
      className={"MonsterButton " + (monsterClick ? "MonsterButton-click" : "")}
      onClick={() => handleMonsterClick()}
    >
      {renderMonster(monsterColor)}
    </div>
  );
}

export default MonsterButton;
