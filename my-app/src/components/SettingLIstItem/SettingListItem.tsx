import React from 'react'
import './index.css'



function SettingListItem({settingInfo}:any) {
  return (
    <li className='SettingListItem'>
        <div className='SettingListItem-title'>{Object.keys(settingInfo)}</div>
        <input className='SettingListItem-input' placeholder={settingInfo[Object.keys(settingInfo)[0]]}/>
    </li>
  )
}

export default SettingListItem