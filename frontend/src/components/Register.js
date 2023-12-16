import { useNavigate } from 'react-router-dom';
import Header from './Header';
import InfoTooltip from './InfoTooltip';

function Register({handleRegister, email, setEmail, password, setPassword, authSuccess, setAuthSuccess}) {
  const navigate = useNavigate(); // Используйте useNavigate для получения функции навигации
  const handleRedirect = () => {
    // Перенаправление на указанный маршрут
    navigate('/login');
  };
  return (
    <>
      <Header redirect="/login" text="Войти" />
      <form className="auth-form">
        <h2 className="auth-form__title">Регистрация</h2>
        <input
          className="auth-form__input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Email"
          required
        />
        <span className="auth-form__error"></span>
        <input
          className="auth-form__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
        <span className="auth-form__error"></span>
        <button type="submit" className="auth-form__submit-button" onClick={handleRegister}>Зарегистрироваться</button>
        <p className="auth-form__text">Уже зарегистрированы? <button className="auth-form__login-button" type="button" onClick={handleRedirect}>Войти</button></p> 
      </form>
      {authSuccess === false && (
        <InfoTooltip
        message="Вы успешно зарегистрировались!"
          isSuccess={true}
          onClose={() => setAuthSuccess(null)}
        />
      )}
    </>
  );
}

export default Register;
