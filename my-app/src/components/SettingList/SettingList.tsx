import React from "react";
import SettingListItem from "../SettingLIstItem/SettingListItem";
import "./index.css";

function SettingList({ settingInfos, isButtonText }: any) {
  return (
    <ul className="SettingList">
      {settingInfos.map((settingInfo: any) => (
        <SettingListItem
          settingInfo={settingInfo}
          isButtonText={isButtonText}
        />
      ))}
    </ul>
  );
}

export default SettingList;
