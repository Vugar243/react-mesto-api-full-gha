import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from './contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, formValidator }) {
  const [name, setName] = useState(''); // Создаем стейт-переменную для имени
  const [description, setDescription] = useState(''); // Создаем стейт-переменную для описания
  const currentUser = useContext(CurrentUserContext);

  // Обработчик изменения поля имени
  const handleNameChange = (e) => {
    setName(e.target.value); // Обновляем стейт-переменную при изменении поля имени
  };

  // Обработчик изменения поля описания
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Обновляем стейт-переменную при изменении поля описания
  };

  // Обработчик отправки формы
function handleUpdateProfile(e) {
  e.preventDefault();
  // Вызываем переданный в пропсах обработчик onUpdateUser с новыми данными
  onUpdateUser({
    name,
    about: description,
  });
}
  useEffect(() => {
    setName(currentUser.name); // Обновляем имя из контекста
    setDescription(currentUser.about); // Обновляем описание из контекста
  }, [isOpen, currentUser]);
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleUpdateProfile}
      formValidator={formValidator}
    >
      <input id="name-input" className="popup__input popup__input_type_name" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" required value={name} onChange={handleNameChange}/>
      <span className="popup__input-error name-input-error"></span>
      <input id="job-input" className="popup__input popup__input_type_description" type="text" name="about" placeholder="Введите род деятельности" minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange}/>
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
