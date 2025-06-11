const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Robot = sequelize.define('Robot', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serial_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
    last_seen: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'robots',
    timestamps: false,
});

module.exports = Robot;
