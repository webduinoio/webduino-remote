import React from "react";
import "./index.css";
import { ReactComponent as ImageMenu } from "../../images/menu.svg";
import { ReactComponent as ImageMenuBack } from "../../images/menuBack.svg";

interface Props {
  menuIsShow: boolean;
  handleOnClick: () => void;
}

function Menu({ menuIsShow, handleOnClick }: Props) {
  return (
    <div className="Menu" onClick={handleOnClick}>
      {menuIsShow ? (
        <ImageMenu height="30" width="30" />
      ) : (
        <ImageMenuBack height="30" width="30" />
      )}
    </div>
  );
}

export default Menu;
