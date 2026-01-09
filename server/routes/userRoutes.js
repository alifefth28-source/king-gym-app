const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware'); 


router.post('/membership', verifyToken, userController.buyMembership);

module.exports = router;