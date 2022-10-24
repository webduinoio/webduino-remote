import React from 'react'
import './index.css'

interface Props {
  hamburgerIsShow: boolean,
  handleHamburgerClick: () => void
}
function Hamburger({ hamburgerIsShow, handleHamburgerClick }: Props) {
  return (
    <div className={"Hamburger "+(hamburgerIsShow?'':'is-active')} onClick={()=>handleHamburgerClick()}>
      <span className="Hamburger-line"></span>
      <span className="Hamburger-line"></span>
      <span className="Hamburger-line"></span>
    </div>
  )
}

export default Hamburger

