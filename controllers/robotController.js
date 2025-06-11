const { Robot } = require('../models');

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

