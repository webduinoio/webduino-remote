import React from 'react'
import './index.css'



function SettingListItem({ settingInfo, isButtonText }: any) {
  return (
    <li className='SettingListItem'>
      {isButtonText ? <input className='SettingListItem-titleInput' placeholder={Object.keys(settingInfo)[0]} /> : <div className='SettingListItem-title'>{Object.keys(settingInfo)}</div>}

      <input className='SettingListItem-input' placeholder={settingInfo[Object.keys(settingInfo)[0]]} />
    </li>
  )
}

export default SettingListItem