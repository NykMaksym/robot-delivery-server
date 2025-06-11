const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

router.get('/', robotController.getRobots);
router.get('/:id', robotController.getRobotById);

module.exports = router;
