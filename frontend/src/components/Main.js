import React, { useContext } from 'react';
import CurrentUserContext from './contexts/CurrentUserContext';
import Card from './Card';
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDislike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext); 
  return (
  <main className="content">
    <section className="profile">
      <div className="profile-container">
        <img onClick={onEditAvatar} className="profile-container__avatar" src={currentUser.avatar} alt="Profile Avatar" />
        <button className="profile-container__edit-button" type="button"></button>
        <div className="profile-info">
          <h1 className="profile-info__title">{currentUser.name}</h1>
          <p className="profile-info__subtitle">{currentUser.about}</p>
          <button onClick={onEditProfile} className="profile-info__edit-button" type="button"></button>
        </div>
      </div>
      <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
    </section>
    <section className="section-elements">
    <ul className="elements">
    {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDislike={onCardDislike} onCardDelete={onCardDelete} /> 
          ))}
    </ul>
    </section>
  </main>
  );
}

export default Main;