const { Mission, Robot } = require('../models');

exports.createMission = async (req, res) => {
    try {
        const { robot_id, route, description } = req.body;

        if (!robot_id || !Array.isArray(route) || route.length === 0) {
            return res.status(400).json({ message: 'Некоректні вхідні дані' });
        }

        const robot = await Robot.findByPk(robot_id);
        if (!robot) {
            return res.status(404).json({ message: 'Робота не знайдено' });
        }

        const mission = await Mission.create({
            robot_id,
            route,
            description,
            status: 'pending',
        });

        return res.status(201).json({
            message: 'Місію створено успішно',
            mission,
        });
    } catch (error) {
        console.error('Помилка при створенні місії:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll({
            include: [{ model: Robot, attributes: ['id', 'name'] }]
        });

        return res.status(200).json(missions);
    } catch (error) {
        console.error('Помилка при отриманні місій:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getMissionsByRobotId = async (req, res) => {
    try {
        const { robot_id } = req.query;

        if (!robot_id) {
            return res.status(400).json({ message: 'Не вказано robot_id' });
        }

        const missions = await Mission.findAll({
            where: { robot_id },
            include: [{ model: Robot, attributes: ['id', 'name'] }]
        });

        return res.status(200).json(missions);
    } catch (error) {
        console.error('Помилка при отриманні місій за роботом:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};



