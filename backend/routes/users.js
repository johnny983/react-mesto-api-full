const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login, createUser, getCurrentUser, getUsers, getUserById, changeUserInfo, changeAvatar,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(7),
    password: Joi.string(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(7),
    password: Joi.string(),
  }),
}), login);
router.get('/me', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
}), getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
}), getUsers);
router.patch('/me', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
  }),
}), changeUserInfo);
router.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string().token(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/[\w*-?./]*\/?$/i),
  }),
}), changeAvatar);

module.exports = router;
