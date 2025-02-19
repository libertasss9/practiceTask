const Question = require('../models/questionModel.cjs');


exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      status: 'success',
      data: {
        questions
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

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        question
      }
    });
  }catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newQuestion
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        question
      }
    });
  } catch (err) {
    res.status(404).json({//req?
      status: 'fail',
      message: err
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
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