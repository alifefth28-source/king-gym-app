const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/', verifyToken, bookingController.getMyBookings);
router.delete('/:id', verifyToken, bookingController.cancelBooking);

module.exports = router;