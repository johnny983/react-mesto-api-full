import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from './../context/CurrentUserContext'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDesc(currentUser.about || '');
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescChange = (e) => {
    setDesc(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      about: desc,
      name: name,
    });
  }

  return (
    <PopupWithForm title={'Редактировать профиль'} name={'edit'}
      isOpen={props.isOpen} onClose={props.onClose}
      buttonTitle={'Сохранить'} onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} className="popup__input popup__input_name" id="name-input" minLength="2" maxLength="40" placeholder="Имя" required name="popup-input-name" />
      <div className="popup__input-error" id="name-input-error"></div>
      <input type="text" value={desc} onChange={handleDescChange} className="popup__input popup__input_job" id="job-input" minLength="2" maxLength="200" placeholder="Род деятельности" required name="popup-input-job" />
      <div className="popup__input-error" id="job-input-error"></div>
    </PopupWithForm>
  )
}

export default EditProfilePopup 