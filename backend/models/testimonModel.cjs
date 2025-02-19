const mongoose = require('mongoose');

const badWords = ['russian', 'ё', 'ъ', 'ы'];

const testimoniesSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  star: {
    type: Number,
    required: [true, 'testimon must have a rating'],
    min: 0,
    max: 5,
  },
  review: {
    type: String,
    minlength: 220,
    maxlength: 720,
    required: [true, 'testimon must have a review'],
    validate: {
      validator: function (v) {
        const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'iu');
        return !regex.test(v);
      },
      message: (props) => `${props.value} contains inappropriate language!`,
    },
  },
  reviewer_name: {
    type: String,
    required: [true, 'testimon must have a reviewer name'],
    validate: {
      validator: function (v) {
        const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'iu');
        return !regex.test(v);
      },
      message: (props) => `${props.value} contains inappropriate language!`,
    },
  },
  reviewer_image: String,
});

const Testimon = mongoose.model('Testimon', testimoniesSchema);

module.exports = Testimon;
