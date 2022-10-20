import React from 'react'
import SettingList from '../SettingList/SettingList'
import "./index.css"

function Setting() {
  const settingTopic = {
    '發送':'test1',
    '接送':'test2'
  }
  return (
    <div className='Setting'>
        <div className="Setting-topic">
          <p className='Setting-title'>廣播頻道</p>
          <SettingList />
        </div>
        <div className="Setting-monsterText">
          <p className='Setting-title'>怪獸廣播訊息</p>
        </div>
        <div className="Setting-buttonText">
          <p className='Setting-title'>按鈕廣播訊息</p>
        </div>
    </div>
  )
}

export default Setting