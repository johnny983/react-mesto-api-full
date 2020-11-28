import React from 'react'
import PopupWithForm from './PopupWithForm'

function CardDeletePopup(props) {
  function handleDeleteConfirm(e) {

    e.preventDefault();
    props.onCardDelete(props.isOpen);
  }

  return (
    <PopupWithForm
      onSubmit={handleDeleteConfirm}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title={'Вы уверены?'}
      buttonTitle={'Да'}
      name={'confirm'}
    />
  )
}

export default CardDeletePopup
