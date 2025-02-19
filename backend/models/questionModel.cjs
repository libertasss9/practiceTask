const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:[true, 'message must have a fullname']
  },
  address: {
    type: String,
    validate: [
      {
        validator: function (v) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: props => `${props.value} is not a valid mail address!`
      },
      {
        validator: async function (v) {
            const existingMail = await mongoose.models.Mail.findOne({ address: v });
            return !existingMail; 
        },
        message: props => `${props.value} is already in use!`
      }
    ]
  },
  message: {
    type: String,
    required:[true, 'message must have a message']
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;