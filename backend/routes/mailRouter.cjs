const express = require('express');
const mailController =require('../controllers/mailController.cjs');

const router = express.Router();

router
  .route('/')
  .get(mailController.getAllMails)
  .post(mailController.createMail);

router
  .route('/:id')
  .get(mailController.getMail)
  .patch(mailController.updateMail)
  .delete(mailController.deleteMail);

module.exports = router;