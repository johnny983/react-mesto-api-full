
import React from 'react'
import { useHistory } from 'react-router-dom'

function InfoTooltip(props) {

  const popupRef = React.useRef()
  const history = useHistory();

  const closeHandler = () => {
    popupRef.current.classList.remove('popup_opened')
    if (props.regStatus === 'success')
      {
        history.push('/signin')
      }

    props.setRegStatus(false)
  }

  return (
    <div ref={ popupRef } className={`popup ${props.regStatus ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={closeHandler}></button>
        <div className={`popup__register ${props.regStatus}`}>
        <h2 className="popup__header">
          {
          props.regStatus === 'success' ?
          'Вы успешно зарегистрировались!' :
          'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
