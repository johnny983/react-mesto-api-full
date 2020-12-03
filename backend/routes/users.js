const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login, createUser, getCurrentUser, getUsers, getUserById, changeUserInfo, changeAvatar,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(5),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(5),
    password: Joi.string().required(),
  }),
}), login);
router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);
router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
}), getUsers);
router.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), changeUserInfo);
router.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/[\w*-?./]*\/?$/i).required(),
  }),
}), changeAvatar);

module.exports = router;
