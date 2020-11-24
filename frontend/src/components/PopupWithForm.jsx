import React from 'react'

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
        <h2 className="popup__header">{props.title}</h2>
        <form onSubmit={props.onSubmit} className={`popup__form popup__${props.name}-form`} name={`popup-${props.name}-form`} method="post" action="#" noValidate>
          {props.children}
          {props.buttonTitle && <button type="submit" className="popup__button">{props.buttonTitle}</button> }
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
