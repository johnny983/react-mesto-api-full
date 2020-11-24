import React from 'react'
import AuthForm from './AuthForm'


const Login = (props) => {
  return (
      <div className="popup__container_auth">
        <AuthForm handleLogin={props.handleLogin} login={props.login} />
      </div>
  )
}

export default Login
