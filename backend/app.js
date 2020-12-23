const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { Error404 } = require('./errors/index');

const cardsRoutes = require('./routes/cards.js');
const usersRoutes = require('./routes/users.js');
const createUser = require('./routes/users.js');
const login = require('./routes/users.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
dotenv.config();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use('/cards', auth, cardsRoutes);
app.use('/users', auth, usersRoutes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', createUser);
app.use('/', login);

app.use(errorLogger);

app.use(errors());

app.all('*', () => {
  throw new Error404('Данный ресурс не найден');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log('Все в порядке, машина исправна!');
});
