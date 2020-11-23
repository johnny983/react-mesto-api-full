const { Schema, model, Types } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    minlength: 2,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/[\w*-?./]*\/?$/i.test(v);
      },
      message: 'Вы ввели некорректный URL',
    },
  },
  likes: [
    {
      type: Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
