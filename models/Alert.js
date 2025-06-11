const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Robot = require('./Robot');

const Alert = sequelize.define('Alert', {
    robot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Robot,
            key: 'id',
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'alerts',
    timestamps: false,
});

module.exports = Alert;
