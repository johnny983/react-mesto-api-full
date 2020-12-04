import './../index.css'
import Main from './Main'
import React from 'react'
import {
  useHistory,
  Redirect,
  Switch,
  Route,
  useLocation,
} from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import { api } from './../utils/api'
import { apiAuth } from './../utils/apiAuth'
import EditProfilePopup from './EditProfilePopup'
import { CurrentUserContext } from './../context/CurrentUserContext'
import CardDeletePopup from './CardDeletePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ProtectedRoute from './ProtectedRoute'
import { setToken } from './../utils/token'
import AddPlacePopup from './AddPlacePopup'
import { getToken } from './../utils/token'
import ImagePopup from './ImagePopup'
import Register from './Register'
import Login from './Login'


function App() {

  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, editProfilePopupOpen] = React.useState(false)
  const [isCardDeletePopupOpen, cardDeletePopupOpen] = React.useState(null)
  const [isAddPlacePopupOpen, addPlacePopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [selectedCard, selectCard] = React.useState(null)
  const [regStatus, setRegStatus] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const [loader, setLoader] = React.useState(true)
  const [cards, setCards] = React.useState([])
  const location = useLocation()
  const history = useHistory()

  console.log(loggedIn);

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

  const handleLogin = (userData) => {
    setUserData(userData)
    setLoggedIn(true)
    history.push('/')
  }

  const register = (URL, method, userData) => {
  apiAuth.auth(URL, method, userData)
      .then((res) => {
        if (res.statusCode !== 400)
        setErrorMessage('')
        setRegStatus('success')
      })
    .catch((err) => {
      setRegStatus('decline')
      setErrorMessage(err)
    })
  }

  const login = (URL, method, userData) => {
    apiAuth.auth(URL, method, userData)
    .then((data) => {
      if (!data) {
        setErrorMessage('Что-то пошло не так!')
      }

      if (data.token) {
        setToken(data.token)
        setErrorMessage('')
        handleLogin(userData)
      }
    })
    .catch((err) => {
      setErrorMessage(err)
    })
  }

React.useEffect(() => {
  const tokenCheck = () => {
    const jwt = getToken()

    if (jwt) {
      apiAuth.getData('/users/me', jwt)
      .then((data) => {
        if (data) {
          const userInfo = {
            id: data._id,
            email: data.email
          }
          setUserData(userInfo)
          setLoggedIn(true)
        }
      })
      .catch(err => console.log(err));
    }
  }
  tokenCheck();
  }, [ loggedIn ]);

  React.useEffect(() => {
    setErrorMessage(null);
  }, [ location.pathname ]);

  React.useEffect(() => {
  if (loggedIn) {
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
    }
  }, [ loggedIn ])

  React.useEffect(() => {
    if (loggedIn) {
    api.getProfile('/users/me')
      .then(result => setCurrentUser(result))
      .catch(error => console.log(error))
    }
  }, [ loggedIn ])

return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          userData={userData}
        />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardDelete={handleCardDelete}
              onTrashClick={handleTrashClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              setLoader={setLoader}
              loader={loader}
              cards={cards}
            />
            <Footer />
          </ProtectedRoute>

          <Route path="/signup">
            <Register
              errorMessage={errorMessage}
              setRegStatus={setRegStatus}
              regStatus={regStatus}
              register={register}
            />
          </Route>

          <Route path="/signin">
            <Login
              errorMessage={errorMessage}
              handleLogin={handleLogin}
              login={login}
            />
          </Route>

          <Route>
            {
              loggedIn ?
              <Redirect to="/" /> :
              <Redirect to="/signin" />
            }
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
        />

        <CardDeletePopup
          onCardDelete={handleCardDelete}
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
  );
}

export default App;
