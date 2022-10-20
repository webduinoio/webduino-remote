import React from 'react'
import './index.css';

function Input() {
    return (
        <div className="Input">
            <input type="text" className="Input-input" placeholder="輸入文字" />
            <button className="Input-button">傳送</button>
        </div>
    )
}

export default Input