import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button popup__image-close-button" onClick={onClose}></button>
        <img className="popup__image-image" src={card?.link} alt={card?.name} />
        <h2 className="popup__image-title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;