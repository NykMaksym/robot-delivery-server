const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Robot = require('./Robot');

const Log = sequelize.define('Log', {
    robot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Robot,
            key: 'id',
        }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    battery_level: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'logs',
    timestamps: false,
});

module.exports = Log;
