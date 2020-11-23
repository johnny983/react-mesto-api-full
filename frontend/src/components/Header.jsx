import React from 'react'
import Logo from './../images/logo-mesto.svg'

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="текстовый логотип &laquo;Mesto Russia&raquo;" className="header__logo" />
    </header>
  )
}

export default Header