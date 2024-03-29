const Card = require('../models/card');
const { Error404, Error403 } = require('../errors/index');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(200).send(newCard);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => Card
  .findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new Error404('Карточка не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new Error403('Вы не можете удалить карточку другого пользователя');
    }
    Card
      .findOneAndRemove(req.params.cardId)
      .then((cardToDelete) => {
        if (!cardToDelete) {
          throw new Error404('Карточка не найдена');
        }
      })
      .then(res.status(200).send(card))
      .catch(next);
  })
  .catch(next);

const getCards = (req, res, next) => Card
  .find({})
  .then((cards) => {
    res.status(200).send(cards || []);
  })
  .catch(next);

module.exports = { createCard, deleteCard, getCards };
