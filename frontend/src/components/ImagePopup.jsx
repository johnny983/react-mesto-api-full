import React from 'react'
function ImagePopup(props) {
  const src = props.card ? props.card.link : '#'
  const alt = props.card ? props.card.name : ''
  return (
    <div className={`popup popup_zoom ${props.card ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose} />
        <img className="popup__image" src={src} alt="#" />
        <figcaption className="popup__caption">{alt}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup 