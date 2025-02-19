const express = require('express');
const roomController =require('../controllers/roomController.cjs');

const router = express.Router();

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

// router.route('/room/:personalID').get(roomController.personalId);

// router
//   .route('/count/:type')
//   .get(roomController.countOfRooms);

// router
//   .route('/count/:type/available')
//   .get(roomController.countOfAvailableRooms);

// router
//   .route('/filter/f')
//   .get(roomController.getRooms);

module.exports = router;