const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  login, createUser, getCurrentUser, getUsers, changeUserInfo, changeAvatar,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/me', getCurrentUser);
// router.get('/:id', getUserById);
router.get('/', getUsers);
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
