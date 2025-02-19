const express = require('express');
const testimonController =require('../controllers/testimonController.cjs');

const router = express.Router();

router
  .route('/')
  .get(testimonController.getAllTestimonies)
  .post(testimonController.createTestimon);

router
  .route('/:id')
  .get(testimonController.getTestimon)
  .patch(testimonController.updateTestimon)
  .delete(testimonController.deleteTestimon);

router
    .route('/stars/:rate')
    .get(testimonController.getTestimoniesByRate);

module.exports = router;