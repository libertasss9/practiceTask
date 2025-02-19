const Room = require('../models/roomModel.cjs');
const ApiFeatures = require('../utils/apiFeatures.cjs');

exports.getAllRooms = async (req, res) => {
  try {
    const features = new ApiFeatures(Room.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const rooms = await features.query;
    res.status(200).json({
      status: 'success',
      data: {
        rooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newRoom,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
