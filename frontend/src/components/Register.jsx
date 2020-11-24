import React from 'react'
import AuthForm from './AuthForm'

const Register = (props) => {
  return (
      <div className="popup__container_auth">
        <AuthForm
        onClose={props.onClose}
        register={props.register}
        regStatus={props.regStatus}
        setRegStatus={props.setRegStatus}
        errorMessage={props.errorMessage}
        />
      </div>
  )
}

export default Register
