import React, { useState } from "react";
import SettingPopup from "../SettingPopup/SettingPopup";
import "./index.css";

interface Props {
  setPopupIsShow: (state: boolean) => void;
}

function SettingLink({ setPopupIsShow }: Props) {
  return (
    <div className="SettingLink" onClick={() => setPopupIsShow(true)}>
      儲存分享連結
    </div>
  );
}

export default SettingLink;
