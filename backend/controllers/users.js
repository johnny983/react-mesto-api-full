const dotenv = require('dotenv');

dotenv.config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, SALT_ROUND } = process.env;

const User = require('../models/user');
const {
  Error400, Error401, Error404, Error409,
} = require('../errors/index');

const getCurrentUser = (req, res, next) => User
  .findOne({ _id: req.user._id })
  .then(((user) => {
    if (!user) {
      throw new Error404('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  }))
  .catch(next);

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error400('Ошибочные данные');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error409('Такой email уже зарегистрирован');
      }
      return bcrypt.hash(password, +SALT_ROUND)
        .then((hash) => User.create({
          email,
          password: hash, // записываем хеш в базу
        }))
        .then((newUser) => {
          res.status(200).send({ email: newUser.email, _id: newUser._id });
        })
        .catch((error) => res.status(500).send({ message: error }));
    })
    .catch(next);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error400('Ошибочные данные');
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error401('Неправильный логин или пароль');
      }
      bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        }
        throw new Error401('Неправильный логин или пароль');
      });
    })
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((newAvatar) => {
      if (!newAvatar) {
        throw new Error404('Аватар не обновлен');
      }
      res.status(200).send(newAvatar);
    })
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((newUser) => {
      if (!newUser) {
        throw new Error404('Пользователь не обновлен');
      }
      res.status(200).send(newUser);
    })
    .catch(next);
};

const getUsers = (req, res, next) => User
  .find({})
  .then((users) => {
    res.status(200).send(users || 'Не создано ни одного пользователя');
  })
  .catch(next);

const getUserById = (req, res, next) => User
  .findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw new Error404('Такого пользователя не существует');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports = {
  login,
  getUsers,
  createUser,
  getUserById,
  changeAvatar,
  changeUserInfo,
  getCurrentUser,
};
