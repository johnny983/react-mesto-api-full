import React from 'react'
import PopupWithForm from './PopupWithForm'

function CardDeletePopup(props) {
  function handleDeleteConfirm(e) {

    e.preventDefault();
    props.onCardDelete(props.isOpen);
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
      title={'Вы уверены?'}
      name={'confirm'} buttonTitle={'Да'}
      onClose={props.onClose}
      onSubmit={handleDeleteConfirm} />
  )
}

export default CardDeletePopup 