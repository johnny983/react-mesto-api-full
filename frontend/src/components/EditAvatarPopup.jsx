import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()
  const [avatar, setAvatar] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  const handleInputChange = () => {
    setAvatar(avatarRef.current.value)
  }

  return (
    <PopupWithForm title={'Обновить аватар'} name={'avatar'}
      isOpen={props.isOpen} onClose={props.onClose}
      buttonTitle={'Сохранить'} onUpdateUser={props.handleUpdateUser} onSubmit={handleSubmit}>
      <input type="url" ref={avatarRef} onChange={handleInputChange} className="popup__input popup__input_link" id="link-input" placeholder="Ссылка на картинку" required name="popup-input-link" />
      <div className="popup__input-error" id="link-input-error"></div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup 