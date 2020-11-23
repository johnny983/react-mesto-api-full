import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const titleRef = React.useRef()
  const urlRef = React.useRef()
  const [title, setTitle] = React.useState('')
  const [url, setURL] = React.useState('')

  const handleTitleChange = () => {
    setTitle(titleRef.current.value)
  }

  const handleURLChange = () => {
    setURL(urlRef.current.value)
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
      <input type="text" ref={titleRef} onChange={handleTitleChange} className="popup__input popup__input_title" id="title-input" minLength="2" maxLength="30" placeholder="Название" required name="popup-input-title" />
      <div className="popup__input-error" id="title-input-error"></div>
      <input type="url" ref={urlRef} onChange={handleURLChange} className="popup__input popup__input_link" id="link-input" placeholder="Ссылка на картинку" required name="popup-input-link" />
      <div className="popup__input-error" id="link-input-error"></div>
    </PopupWithForm>
  )
}

export default AddPlacePopup 