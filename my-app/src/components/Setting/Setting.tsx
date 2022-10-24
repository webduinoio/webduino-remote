import React, { useState } from 'react'
import SettingLink from '../SettingLink/SettingLink'
import SettingList from '../SettingList/SettingList'
import SettingPopup from '../SettingPopup/SettingPopup'

import "./index.css"


function Setting() {
  const [popupIsShow, setPopupIsShow] = useState(false)
  const settingTopic = [
    { '發送': 'test1' },
    { '接送': 'test2' }
  ]
  const settingMonsterText = [
    { '小車中間': 'reset' },
    { '小車往上': 'up' },
    { '小車往下': 'down' },
    { '小車往左': 'left' },
    { '小車往右': 'right' },
    { '綠色怪獸': 'g' },
    { '紅色怪獸': 'r' },
    { '黃色怪獸': 'y' },
    { '藍色怪獸': 'b' },
  ]
  const settingButtonText = [
    { '按鈕1': '1' },
    { '按鈕2': '2' },
    { '按鈕3': '3' },
    { '按鈕4': '4' },
    { '按鈕5': '5' },
    { '按鈕6': '6' },
    { '按鈕7': '7' },
    { '按鈕8': '8' },
    { '按鈕9': '9' },
    { '按鈕10': '10' },
  ]
  return (
    <div className='Setting'>
      <div className="Setting-topic">
        <p className='Setting-title'>廣播頻道</p>
        <SettingList settingInfos={settingTopic} isButtonText={false}/>
      </div>
      <div className="Setting-monsterText">
        <p className='Setting-title'>怪獸廣播訊息</p>
        <SettingList settingInfos={settingMonsterText} isButtonText={false}/>
      </div>
      <div className="Setting-buttonText">
        <p className='Setting-title'>按鈕廣播訊息</p>
        <SettingList settingInfos={settingButtonText} isButtonText={true}/>
      </div>
      <SettingLink setPopupIsShow={setPopupIsShow}/>
      {
        popupIsShow?<SettingPopup setPopupIsShow={setPopupIsShow}/>:""
      }
    </div>
  )
}

export default Setting