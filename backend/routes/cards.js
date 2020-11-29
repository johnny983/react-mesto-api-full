const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    link: Joi.string().regex(/^https?:\/\/[\w*-?./]*\/?$/i),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

module.exports = router;
