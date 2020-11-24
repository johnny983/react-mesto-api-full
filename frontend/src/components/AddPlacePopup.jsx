import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('')
  const [url, setURL] = React.useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleURLChange = (e) => {
    setURL(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title,
      url
    });
  }

  return (
    <PopupWithForm title={'Новое место'} name={'add'}
      isOpen={props.isOpen} onClose={props.onClose}
      buttonTitle={'Создать'} onSubmit={handleAddPlaceSubmit}>
      <input type="text" onChange={handleTitleChange} className="popup__input popup__input_title" id="title-input" minLength="2" maxLength="30" placeholder="Название" required name="popup-input-title" />
      <div className="popup__input-error" id="title-input-error"></div>
      <input type="url" onChange={handleURLChange} className="popup__input popup__input_link" id="link-input" placeholder="Ссылка на картинку" required name="popup-input-link" />
      <div className="popup__input-error" id="link-input-error"></div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
