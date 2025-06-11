const { Log, Robot } = require('../models');

exports.receiveLog = async (req, res) => {
    try {
        const { robot_id, latitude, longitude, battery_level, status } = req.body;

        if (!robot_id || latitude == null || longitude == null) {
            return res.status(400).json({ message: 'Необхідні дані відсутні' });
        }

        const robot = await Robot.findByPk(robot_id);
        if (!robot) {
            return res.status(404).json({ message: 'Робота не знайдено' });
        }

        await Log.create({
            robot_id,
            latitude,
            longitude,
            battery_level,
            status,
        });

        robot.last_seen = new Date();
        await robot.save();

        res.status(200).json({ message: 'Дані прийнято успішно' });
    } catch (error) {
        console.error('Помилка при збереженні логу:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.findAll({
            include: [{
                model: Robot,
                attributes: ['id', 'name'],
            }],
            order: [['timestamp', 'DESC']],
        });

        res.status(200).json(logs);
    } catch (error) {
        console.error('Помилка при отриманні логів:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

exports.getLogsByRobot = async (req, res) => {
    try {
        const robotId = req.params.robotId;
        console.log(robotId)

        const logs = await Log.findAll({
            where: { robot_id: robotId },
            order: [['timestamp', 'DESC']],
        });

        if (!logs.length) {
            return res.status(404).json({ message: 'Логи для цього робота не знайдено' });
        }

        res.status(200).json(logs);
    } catch (error) {
        console.error('Помилка при отриманні логів робота:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};

