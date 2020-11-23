import React from 'react'
import Card from './Card'
import { CurrentUserContext } from './../context/CurrentUserContext'


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const userAvatar = currentUser.avatar
  const userName = currentUser.name
  const userDesc = currentUser.about

  return (
    <main className="main">
      <section className="profile">
        <figure className="profile__figure">
          <div className="profile__image" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__header">{userName}</h1>
              <button className="profile__edit-button open-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subheader">{userDesc}</p>
          </div>
          <button className="profile__add-button open-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
        </figure>
      </section>
      <section className="photo-grid">
        {props.cards.map((card) =>
          <Card
            card={card}
            onCardClick={props.onCardClick}
            onTrashClick={props.onTrashClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            key={card._id}
            loader={props.loader}
            setLoader={props.setLoader}
          />)}
      </section>
    </main>
  )
}

export default Main