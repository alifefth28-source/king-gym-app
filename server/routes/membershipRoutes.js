const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const { verifyToken } = require('../middleware/authMiddleware');


router.post('/join', verifyToken, membershipController.joinMembership);

module.exports = router;