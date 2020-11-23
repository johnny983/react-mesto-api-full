const router = require('express').Router();
const {
  getUsers, getUserById, changeUserInfo, changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getUserById); // надо подумать как передать id текущего пользователя в уже имеющуюся функцию
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
