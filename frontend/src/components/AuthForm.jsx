import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import InfoTooltip from './InfoTooltip'


function AuthForm(props) {
  const location = useLocation();

  const [ inputData, setInputData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
      props.register(location.pathname, 'POST', inputData)
  }

const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.login(location.pathname, 'POST', inputData)
    // setInputData({ email: '', password: ''});
  }

  return (
    <>
      <div className="inverted">
        <h2 className="popup__header">{ location.pathname === '/signup' ? 'Регистрация' : 'Вход' }</h2>
        <form
          onSubmit={ location.pathname === '/signup' ? handleRegisterSubmit : handleLoginSubmit }
          className="popup__form"
          method="post"
          action="#"
          noValidate
        >
          <input
            type="email"
            placeholder="Email"
            onChange={ handleChange }
            className="popup__input"
            minLength="2"
            maxLength="40"
            required
            name="email"
          />

          <div className="popup__input-error_active" id="email-input-error"></div>

          <input
            type="password"
            placeholder="Пароль"
            onChange={ handleChange }
            className="popup__input"
            minLength="2"
            maxLength="200"
            required
            name="password"
          />

          <div className="popup__input-error_active" id="password-input-error"></div>

          <button
            type="submit"
            className="popup__button"
          >{ location.pathname === '/signup' ? 'Регистрация' : 'Вход' }</button>

          { location.pathname === '/signup' &&
            <div className="popup__register_hint">Уже зарегистрированы? <Link className="popup__register_link" to="/signin">Войти</Link></div>
          }
          <div className="popup__input-error_active inverted" id="common-input-error">{ props.errorMessage }</div>
        </form>
      </div>
      <InfoTooltip
        onClose={props.onClose}
        regStatus={props.regStatus}
        setRegStatus={props.setRegStatus}
      />
    </>
  )
}

export default AuthForm
