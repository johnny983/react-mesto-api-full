const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET, SALT_ROUND } = require('../configs');
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

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error400('Ошибочные данные');
    }

    User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new Error409('Такой email уже зарегистрирован');
        }
        return bcrypt.hash(password, SALT_ROUND)
          .then((hash) => User.create({
            email,
            password: hash, // записываем хеш в базу
          }))
          .then(({ email, _id }) => {
            res.status(200).send({ email, _id });
          })
          .catch((error) => res.status(500).send({ message: error }));
      });
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error400('Ошибочные данные');
    }
    throw new Error();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error400('Ошибочные данные');
  }

  try {
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
        // res.status(200).send({ _id: user._id });
      });
  } catch (error) {
    throw new Error();
  }
};

const changeAvatar = async (req, res) => {
  try {
    const id = req.user._id;
    const { avatar } = req.body;
    const updatedAvatar = await User.findByIdAndUpdate(id, { avatar }, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    });
    return res.status(200).send(updatedAvatar);
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error400('Ошибочные данные');
    }
    throw new Error();
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error400('Ошибочные данные');
    }
    throw new Error();
  }
};

const getUsers = (req, res, next) => User
  .find({})
  .then((users) => {
    if (users.length === 0) {
      throw new Error404('Не создано ни одного пользователя');
    }
    res.status(200).send(users);
  })
  .catch(next);

const getUserById = (req, res, next) => User
  .findById(req.params.id)
  .then((user) => {
    res.status(200).send(user || 'Нет пользователя с таким id');
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
