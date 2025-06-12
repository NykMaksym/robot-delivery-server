const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

router.post('/', robotController.createRobot);
router.get('/', robotController.getRobots);
router.get('/:id', robotController.getRobotById);
router.put('/:id/assign', robotController.updateRobotOperatorId);
router.get('/operator/:operatorId', robotController.getRobotsByOperator)


module.exports = router;
