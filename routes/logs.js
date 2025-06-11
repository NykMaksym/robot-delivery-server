const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.receiveLog);
router.get('/', logController.getLogs);
router.get('/:robotId', logController.getLogsByRobot);

module.exports = router;
