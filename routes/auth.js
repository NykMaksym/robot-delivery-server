const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin')

router.post('/register', authenticateToken, isAdmin, authController.register);
router.post('/login', authController.login);

module.exports = router;