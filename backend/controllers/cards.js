// controllers/cards.js
const Card = require('../models/card');
const handleError = require('../utils/errorHandler');

// Контроллер для получения всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res));
};

// Контроллер для создания карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // Использую _id пользователя из req.user

  if (!name || !link) {
    const ERROR_CODE = 400;
    return res.status(ERROR_CODE).send({ message: 'Поля "name" и "link" обязательны для заполнения' });
  }

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => handleError(err, res));

  return null;
};
// Контроллер для удаления карточки по ID
module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const ERROR_CODE = 404;
        return res.status(ERROR_CODE).send({ message: 'Карточка не найдена' });
      }

      // Проверка, что текущий пользователь является владельцем карточки
      if (card.owner.toString() !== req.user._id.toString()) {
        const ERROR_CODE = 403; // 403 - Forbidden
        return res.status(ERROR_CODE).send({ message: 'У вас нет прав для удаления этой карточки' });
      }

      // Удаление карточки, если текущий пользователь является владельцем
      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => {
      return res.send({ message: 'Карточка удалена успешно' });
      });
    })
    .catch((err) => handleError(err, res));
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
  return null;
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
  return null;
};
