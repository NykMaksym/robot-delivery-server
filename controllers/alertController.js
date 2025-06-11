const { Alert, Robot} = require('../models');

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.findAll({
            include: [{ model: Robot, attributes: ['id', 'name'] }]
        });

        return res.status(200).json(alerts);
    } catch (error) {
        console.error('Помилка при отриманні повідомлень:', error);
        return res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
};
