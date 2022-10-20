import React from 'react'
import SettingListItem from '../SettingLIstItem/SettingListItem'
import './index.css'

function SettingList() {
  return (
    <ul className='SettingList'>
        <SettingListItem />
        <SettingListItem />
        <SettingListItem />
        <SettingListItem />
    </ul>
  )
}

export default SettingList