import React, { useContext } from 'react';
import CurrentUserContext from './contexts/CurrentUserContext';
function Card({ card, onCardClick, onCardLike, onCardDislike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const likesCount = card.likes.length;
  const isLiked = card.likes.some((like) => like === currentUser._id)

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeOrDislikeClick() {
    if (isLiked) {
      onCardDislike(card);
    } else {
      onCardLike(card);
    }
  }
  
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="element">
      <button className={`element__delete ${card.owner !== currentUser._id && 'element__delete_hidden'}`} type="button" onClick={handleDeleteClick}></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}  />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div>
        <button className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`} type="button" onClick={handleLikeOrDislikeClick}></button>
          <p className="element__likes-count">{likesCount}</p>
        </div>
      </div>
    </li>
  );
}

export default Card; 