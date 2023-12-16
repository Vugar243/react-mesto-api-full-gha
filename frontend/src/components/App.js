import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import authApi from '../utils/AuthApi';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authSuccess, setAuthSuccess] = useState(null); // Состояние для отслеживания успешности аутентификации
  useEffect(() => {
    // Проверка токена при монтировании компонента
    tokenCheck();
    const savedEmail = localStorage.getItem('email');
  if (savedEmail) {
    setEmail(savedEmail);
  }
  }, []);


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((error) => {
          console.error("Ошибка при проверке токена:", error);
        });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authApi
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('email', email);
          setLoggedIn(true);
          navigate('/');
        } else {
          setAuthSuccess(false);
        }
      })
      .catch((error) => {
        console.error("Ошибка при входе:", error);
        setAuthSuccess(false);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    authApi
      .register({ email, password })
      .then(() => {
        setAuthSuccess(false);
      })
      .catch((error) => {
        console.error("Ошибка при регистрации:", error);
        setAuthSuccess(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/login');
  };
  return (
    <div className="page">
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} authSuccess={authSuccess}  setAuthSuccess={setAuthSuccess} email={email} setEmail={setEmail} password={password} setPassword={setPassword}  />} />
        <Route path="/register" element={<Register handleRegister={handleRegister} email={email} setEmail={setEmail} password={password} setPassword={setPassword} authSuccess={authSuccess} setAuthSuccess={setAuthSuccess} />} />
        <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn} element={MainPage} Logout={handleLogout} userEmail={email}/>
            }
          />         
      </Routes>
    </div>
  );
}

export default App;


