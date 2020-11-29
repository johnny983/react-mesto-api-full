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

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      throw new Error404('Карточка для удаления не найдена');
    } else {
      res.status(200).send(card);
    }
  } catch (error) {
    throw new Error();
  }
};

const getCards = (req, res, next) => Card
  .find({})
  .then((cards) => {
    if (cards.length === 0 || !cards) {
      res.status(200).send([]);
    }
    res.status(200).send(cards);
  })
  .catch(next);

module.exports = { createCard, deleteCard, getCards };
