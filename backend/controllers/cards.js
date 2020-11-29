const Card = require('../models/card');
const { Error400, Error404 } = require('../errors/index');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  try {
    const newCard = await Card.create({ name, link, ownerId });
    return res.status(200).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error400('Ошибочные данные');
    }
    throw new Error();
  }
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
