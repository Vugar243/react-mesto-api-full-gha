// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGODB_URI } = process.env;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// Подключение роутов для пользователей
app.use(requestLogger); // Подключаем логгер запросов

app.post('/signin', login);
app.post('/signup', createUser);

app.use(authMiddleware);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errorLogger); // Подключаем логгер ошибок

app.listen(PORT);
