//import { FormValidator } from './FormValidator';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from './contexts/CurrentUserContext';

function MainPage({Logout, loggedIn, userEmail}) {
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  /*
  const validators = {};
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__form-submit',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active',
    });
    formValidator.enableValidation();
    validators[formElement.getAttribute('name')] = formValidator;
  });
  */
  

  const handleAddPlace = (newCardData) => {
    // Отправляем запрос на сервер для создания новой карточки
    api.addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]); // Добавляем новую карточку в начало списка
        closeAllPopups(); // Закрываем все модальные окна
      })
      .catch((err) => {
        console.error('Ошибка при создании карточки:', err);
      });
  };
  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log('Ошибка при загрузке карточек:', err);
      });
  }, []);
  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке данных пользователя:', err);
      });
  }, []);
  function handleUpdateAvatar(avatarData) {
    // Отправляем запрос на сервер для обновления аватара пользователя
    api.updateAvatar(avatarData)
      .then((newUser) => {
        setCurrentUser(newUser); // Обновляем стейт currentUser с новым аватаром
        closeAllPopups(); // Закрываем все модальные окна
      })
      .catch((err) => {
        console.error('Ошибка при обновлении аватара:', err);
      });
  }  
function handleUpdateUser(updatedUser) {
  // Отправляем запрос на сервер для обновления профиля пользователя
  api.updateUserInfo(updatedUser)
    .then((newUser) => {
      setCurrentUser(newUser); // Обновляем стейт currentUser с новыми данными
      closeAllPopups(); // Закрываем все модальные окна
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    });
}
  function handleCardLike(card) {
    // Отправляем запрос в API и получаем обновленные данные карточки
    api.likeCard(card._id).then((newCard) => {
      // Обновляем стейт карточек, заменяя старую карточку на новую
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.error('Ошибка при обработке лайка карточки:', error);
    });
  }
  function handleCardDislike(card) {
    // Отправляем запрос в API и получаем обновленные данные карточки
    api.dislikeCard(card._id).then((newCard) => {
      // Обновляем стейт карточек, заменяя старую карточку на новую
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.error('Ошибка при обработке дизлайка карточки:', error);
    });
  }
  function handleCardDelete(card) {
    // Отправляем запрос в API для удаления карточки
    api.deleteCard(card._id).then(() => {
      // Обновляем стейт cards, исключая удаленную карточку
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header text="Выйти"  Logout={Logout} loggedIn={loggedIn} userEmail={userEmail} />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDislike={handleCardDislike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        /*formValidator={validators}*/
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        /*formValidator={validators}*/
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        /*formValidator={validators}*/
      />
      <PopupWithForm
        name="card"
        title="Вы уверены?"
        /*isOpen={}*/
        /*onClose={}*/
        /*onSubmit={}*/
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default MainPage;
