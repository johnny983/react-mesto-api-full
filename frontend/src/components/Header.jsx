import React from 'react'
import Logo from './../images/logo-mesto.svg'
import { useLocation, Link } from "react-router-dom"
import { removeToken } from './../utils/token'

function Header(props) {
  const location = useLocation();

  function signOut(){
    props.setLoggedIn(false)
    removeToken()
  }

  return (
    <header className="header">
      <img src={Logo} alt="текстовый логотип &laquo;Mesto Russia&raquo;" className="header__logo" />
      <div className="header__auth">
        <span className="header__email">
          {
            props.loggedIn &&
            props.userData ?
            props.userData.email : null
          }
        </span>
          { props.loggedIn ?
            <Link className="header__link" onClick={ signOut } to='/signin'>
            Выйти
            </Link> :
            <Link
              className="header__link"
              to={ location.pathname === '/signin' ? '/signup' : '/signin' }
            >
              { location.pathname === '/signin' ? 'Регистрация' : 'Вход' }
            </Link>
          }
      </div>
    </header>
  )
}

export default Header
