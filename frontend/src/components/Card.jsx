import React from 'react'
import Loader from './Loader'
import { CurrentUserContext } from './../context/CurrentUserContext'

function Card({ loader, setLoader, onCardClick, onCardLike, onTrashClick, card }) {
  const [liked, setLiked] = React.useState(false)

  React.useEffect(() => {
    setLiked(false)
    setLoader(true)
  }, [loader, setLoader])

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card)
    setLiked(true)
  }

  const handleTrashClick = () => {
    onTrashClick(card)
  }

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;

  const trashButtonClass = (
    `${isOwn ? 'photo-grid__trash-button' :
      'photo-grid__trash-button_hidden'}`
  )

  const isLiked = card.likes.some(likeOwner => likeOwner._id === currentUser._id)
  const likedClass = (`${isLiked ? 'liked' : ''}`)

  return (
    <figure className="photo-grid__item">
      <button className={trashButtonClass} type="button" aria-label="удалить" onClick={handleTrashClick}></button>
      <img src={card.link} alt={card.name} className="photo-grid__image" onClick={handleClick} />
      <div className="photo-grid__data">
        <p className="photo-grid__caption">{card.name}</p>
        {
          liked ?
            <Loader /> :
            <button className={`photo-grid__like-button ${likedClass}`} type="button" aria-label="лайк" onClick={handleLikeClick}>
              <p className="photo-grid__like-amount">{card.likes.length}</p>
            </button>
        }
      </div>
    </figure>
  )
}

export default Card