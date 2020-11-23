const Card = require('../models/card');

const putCardLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: `Карточка ${req.params.cardId} не найдена` });
    }
    return res.status(200).send({ message: `Лайк на "${card.name}" установлен` });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: `Нет карточки id = ${req.params.cardId}` });
    }
    return res.status(500).send({ message: error.message });
  }
};

const removeCardLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: `Карточка ${req.params.cardId} не найдена` });
    }
    return res.status(200).send({ message: `Лайк на "${card.name}" удален` });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: `Нет карточки id = ${req.params.cardId}` });
    }
    return res.status(500).send({ message: error.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link });
    return res.status(200).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: `Карточка для удаления ${req.params.cardId} не найдена` });
    }
    return res.status(200).send({ message: `Карточка "${card.name}" была удалена вами` });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: `Нет карточки id = ${req.params.cardId}` });
    }
    return res.status(500).send({ message: error.message });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      res.status(404).send({ message: 'Карточки не добавлены' });
    } else {
      res.status(200).send(cards);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createCard, deleteCard, getCards, putCardLike, removeCardLike,
};
