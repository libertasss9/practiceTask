const Mail = require('../models/mailModel.cjs');


exports.getAllMails = async (req, res) => {
  try {
    const mails = await Mail.find();
    res.status(200).json({
      status: 'success',
      data: {
        mails
      }
    });
  }catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMail = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        mail
      }
    });
  }catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createMail = async (req, res) => {
  try {
    const newMail = await Mail.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newMail
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        mail
      }
    });
  } catch (err) {
    res.status(404).json({//req?
      status: 'fail',
      message: err
    });
  }
};

exports.deleteMail = async (req, res) => {
  try {
    const mail = await Mail.findByIdAndDelete(req.params.id);
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