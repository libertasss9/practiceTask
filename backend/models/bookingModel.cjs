const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'You must enter your name']
    },
    phoneNumber: {
        type: String,
        required: [true, 'You must enter your phone number'],
        validate: {
            validator: function (v) {
                return /^\+?[1-9]\d{0,2}\s?\d{3}\s?\d{3}\s?\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    roomType:{
        type: String,
        required: [true, 'You must enter a room type'], 
        enum: {
            values: ['Lux', 'Deluxe', 'Standard', 'Economy'],
            message: '{VALUE} is not a valid room type!'
          }
    },
    location: {
        type: String,
        required: [true, 'You must enter location'],
        enum: {
            values: ['Lviv', 'Amsterdam', 'Kharkiv'],
            message: '{VALUE} is not a valid location!'
        }
    },
    persons: {
        type: Number,
        required: [true, 'You must enter amount of people be living'],
        min: 1,
        max: 4
    },
    checkIn: {
        type: Date,
        required: [true, 'You must enter a date'],
        validate: {
            validator: function (v) {
            return v > new Date(); 
        },
            message: props => `Check-in date (${props.value}) cannot be in the past!`
        }
    },
    checkOut: {
        type: Date,
        required: [true, 'You must enter a date'],
        validate: {
            validator: function(v) {
                return v > new Date(this.checkIn); 
            },
            message: props => `Check-out date (${props.value}) cannot be before check-in date!`
        }
    },
    comments: {
        type: String,
        max: 200
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;