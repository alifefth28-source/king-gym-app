const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { verifyAdmin } = require('../middleware/authMiddleware'); 


router.post('/', verifyAdmin, classController.createClass);
router.delete('/:id', verifyAdmin, classController.deleteClass);
router.get('/', classController.getAllClasses); 

module.exports = router;