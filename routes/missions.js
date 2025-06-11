const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

router.post('/', missionController.createMission);
router.get('/', missionController.getMissions);
router.get('/:robot_id', missionController.getMissionsByRobotId);

module.exports = router;

