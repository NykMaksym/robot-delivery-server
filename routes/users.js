const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin')

router.post('/operators', authenticateToken, isAdmin, userController.register);
router.get('/operators', authenticateToken, isAdmin, userController.getOperators);
router.post('/login', userController.login);

module.exports = router;