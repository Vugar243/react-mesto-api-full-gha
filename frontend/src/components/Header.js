import React from 'react';
import { useNavigate } from 'react-router-dom';
function Header({ redirect, text, Logout, loggedIn, userEmail }) {
  const navigate = useNavigate(); // Используйте useNavigate для получения функции навигации

  const handleRedirect = () => {
    // Перенаправление на указанный маршрут
    navigate(redirect);
  };
  return (
  <header className="header">
    <div className="header__logo"></div>
    <div className="header__logo-container">
    <p className="header__text">{userEmail}</p>
      {loggedIn ? (
          <button className="header__login-button" type="button" onClick={Logout}>
            {text}
          </button>
        ) : (
          <button className="header__login-button" type="button" onClick={handleRedirect}>
            {text}
          </button>
        )}
    </div>
  </header>
  );
}

export default Header;