const { Robot } = require('../models');

exports.createRobot = async (req, res) => {
    try {
        const {name, serial_number} = req.body;
        const robot = await Robot.create({ name, serial_number, status: 'idle' });
        res.status(201).json({ message: 'Робота створено', robot});
    } catch (err) {
        res.status(500).json({ error: 'Помилка при створенні робота' });
    }
};

exports.getRobots = async (req, res) => {
    try {
        const robots = await Robot.findAll();
        return res.status(200).json(robots);
    } catch (error) {
        console.error('Помилка при отриманні роботів:', error);
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
        console.error('Помилка при отриманні робота:', error);
        return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

