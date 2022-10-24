import React from 'react'
import SettingListItem from '../SettingLIstItem/SettingListItem'
import './index.css'


function SettingList({settingInfos}:any) {
  return (
    <ul className='SettingList'>
        {settingInfos.map((settingInfo:any)=>(
            <SettingListItem settingInfo={settingInfo}/>
        ))}
    </ul>
  )
}

export default SettingList