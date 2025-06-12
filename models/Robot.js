const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {User} = require("./User");

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
        type: DataTypes.DATE
    },
    operator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
},{
    tableName: 'robots',
    timestamps: false,
});

module.exports = Robot;
