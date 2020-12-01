const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().regex(/^https?:\/\/[\w*-?./]*\/?$/i).required(),
  }),
}), createCard);

// headers: Joi.object({
//             token: Joi.string().token().length(20).required()
//         }).unknown()

router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

module.exports = router;
