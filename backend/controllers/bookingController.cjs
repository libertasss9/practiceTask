const Booking = require('../models/bookingModel.cjs');


exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: 'success',
      data: {
        bookings
      }
    });
  }
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  }catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newBooking
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(404).json({//req?
      status: 'fail',
      message: err
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({//req?
      status: 'fail',
      message: err
    });
  }
};