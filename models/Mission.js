const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Robot = require('./Robot');

const Mission = sequelize.define('Mission', {
    robot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Robot,
            key: 'id',
        },
    },
    route: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'missions',
    timestamps: false,
});

module.exports = Mission;
