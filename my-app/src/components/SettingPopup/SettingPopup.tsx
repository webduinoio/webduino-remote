import React from "react";
import "./index.css";

interface Props {
  setPopupIsShow: (state: boolean) => void;
}

function SettingPopup({ setPopupIsShow }: Props) {
  return (
    <div className="SettingPopup">
      <div
        className="SettingPopup-close"
        onClick={() => setPopupIsShow(false)}
      ></div>
      <h4 className="SettingPopup-title">儲存成功</h4>
      <div className="SettingPopup-saveURL">
        https://webduinoio.github.io/webduino-remote/index.html#-NF73DgaxyGV760xJNE4
      </div>
      <div className="SettingPopup-copyBtn" data-clipboard-target="#saveUrl">
        複製連結
      </div>
    </div>
  );
}

export default SettingPopup;
