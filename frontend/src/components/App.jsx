import './../index.css'
import Main from './Main'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { api } from './../utils/api'
import EditProfilePopup from './EditProfilePopup'
import { CurrentUserContext } from './../context/CurrentUserContext'
import CardDeletePopup from './CardDeletePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'

function App() {

  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, editProfilePopupOpen] = React.useState(false)
  const [isCardDeletePopupOpen, cardDeletePopupOpen] = React.useState(null)
  const [isAddPlacePopupOpen, addPlacePopupOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const [selectedCard, selectCard] = React.useState(null)
  const [loader, setLoader] = React.useState(true)
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getCards('/cards')
      .then((items) => {
        const card = items.map(card => ({
          _id: card._id,
          link: card.link,
          name: card.name,
          likes: card.likes,
          owner: card.owner
        }))
        setCards(card)
      })
      .catch(error => console.log(error))
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(likeOwner => likeOwner._id === currentUser._id)
    const method = !isLiked ? 'PUT' : 'DELETE'

    api.toggleLike(`/cards/likes/${card._id}`, method)
      .then((newCard) => {
        const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
        setCards(newCards);
      })
      .then(() => setLoader(false))
      .catch(error => console.log(error))
  }

  const handleCardDelete = (card) => {
    api.deleteCard(`/cards/${card._id}`, 'DELETE')
      .then(() => {
        const newCards = cards.filter((currentCard) => currentCard._id !== card._id)
        setCards(newCards)
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    api.getProfile('/users/me')
      .then(result => setCurrentUser(result))
      .catch(error => console.log(error))
  }, [])

  const handleEditAvatarClick = () => {
    editAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    editProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    addPlacePopupOpen(true)
  }

  const handleTrashClick = (cardToDelete) => {
    cardDeletePopupOpen(cardToDelete)
  }

  const handleCardClick = (card) => {
    selectCard(card)
  }

  const closeAllPopups = () => {
    editAvatarPopupOpen(false)
    editProfilePopupOpen(false)
    addPlacePopupOpen(false)
    cardDeletePopupOpen(false)
    selectCard(null)
  }

  const handleUpdateUser = (newUser) => {
    api.editProfileInfo('/users/me', 'PATCH', newUser.name, newUser.about)
      .then(result => {
        setCurrentUser(result)
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  const handleUpdateAvatar = (newAvatar) => {
    api.setAvatar('/users/me/avatar', 'PATCH', newAvatar)
      .then(result => {
        setCurrentUser(result)
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  const handleAddPlace = (newPlace) => {
    api.addUserCard('/cards', 'POST', newPlace.title, newPlace.url)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onTrashClick={handleTrashClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          setLoader={setLoader}
          loader={loader} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace} />

        <CardDeletePopup isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;