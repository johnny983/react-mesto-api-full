const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expires: '7d' },
      );
      res.status(200).send(token);
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
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
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
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
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send({ message: 'Не создано ни одного пользователя' });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: `Нет пользователя id = ${req.params.id}` });
    }
    return res.status(500).send({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const newUser = await User.create({
      name, about, avatar, email, password,
    });
    return res.status(200).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  changeUserInfo,
  changeAvatar,
};
