import Header from './Header';
import InfoTooltip from './InfoTooltip';

function Login({ handleLogin, authSuccess,  setAuthSuccess, email, setEmail, password, setPassword}) {
  return (
    <>
      <Header redirect="/register" text="Регистрация"  />
      <form className="auth-form">
        <h2 className="auth-form__title">Вход</h2>
        <input
          className="auth-form__input email-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="Email"
        />
        <span className="auth-form__error email-error"></span>
        <input
          className="auth-form__input password-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
        />
        <span className="auth-form__error password-error"></span>
        <button className="auth-form__submit-button" onClick={handleLogin}>
          Войти
        </button>
      </form>
      {authSuccess === false && (
        <InfoTooltip
          message="Что-то пошло не так! Попробуйте ещё раз."
          isSuccess={false}
          onClose={() => setAuthSuccess(null)}
        />
      )}
    </>
  );
}

export default Login;

