const Card = require('../models/card');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, ownerId })
    .then((newCard) => {
      res.status(200).send(newCard || 'Ошибочные данные');
    })
    .catch(next);
};

const deleteCard = (req, res, next) => Card
  .findByIdAndDelete(req.params.cardId)
  .then((card) => {
    res.status(200).send(card || 'Карточка для удаления не найдена');
  })
  .catch(next);

const getCards = (req, res, next) => Card
  .find({})
  .then((cards) => {
    res.status(200).send(cards || []);
  })
  .catch(next);

module.exports = { createCard, deleteCard, getCards };
