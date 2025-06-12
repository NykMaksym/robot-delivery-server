const { Robot } = require('../models');

exports.createRobot = async (req, res) => {
    try {
        const {name, serial_number, operator_id} = req.body;
        const robot = await Robot.create({ name, serial_number, status: 'idle', operator_id: operator_id });
        res.status(201).json({ message: 'Робота створено', robot});
    } catch (err) {
        res.status(500).json({ error: 'Помилка при створенні робота' });
    }
};

exports.updateRobotOperatorId = async (req, res) => {
    const { operator_id } = req.body;
    await Robot.update({ operator_id }, { where: { id: req.params.id } });
    const updatedRobot = await Robot.findByPk(req.params.id);
    res.json(updatedRobot);
};

exports.getRobots = async (req, res) => {
    try {
        const robots = await Robot.findAll();
        return res.status(200).json(robots);
    } catch (error) {
        return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getRobotsByOperator = async (req, res) => {
    try {
        const robots = await Robot.findAll({ where: { operator_id: req.params.operatorId } });
        return res.status(200).json(robots);
    } catch (error) {
        return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getRobotById = async (req, res) => {
    const robotId = req.params.id;
    try {
        const robot = await Robot.findByPk(robotId);
        if (!robot) {
            return res.status(404).json({ message: 'Робота не знайдено' });
        }
        return res.status(200).json(robot);
    } catch (error) {
        return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

