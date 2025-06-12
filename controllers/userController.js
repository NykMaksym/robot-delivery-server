const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password_hash: hash, role: 'operator' });
        res.status(201).json({ message: 'Користувача створено', user });
    } catch (error) {
        res.status(500).json({ message: 'Помилка створення користувача' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ message: 'Невірний пароль' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.json({ message: 'Успішний вхід', userId: user.id , token: token});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Помилка входу' });
    }
};

exports.getOperators = async (req, res) => {
    try {
        const operators = await User.findAll({
            where: { role: 'operator' },
            attributes: ['id', 'username', 'created_at']
        });
        res.status(200).json(operators);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Не вдалося отримати список операторів' });
    }
};