const sequelize = require('../config/database');

const User = require('./User');
const Robot = require('./Robot');
const Mission = require('./Mission');
const Log = require('./Log');
const Alert = require('./Alert');

User.hasMany(Robot, { foreignKey: 'operator_id', onDelete: 'SET NULL' });
Robot.belongsTo(User, { foreignKey: 'operator_id' });

Robot.hasMany(Mission, { foreignKey: 'robot_id', onDelete: 'CASCADE' });
Mission.belongsTo(Robot, { foreignKey: 'robot_id' });

Robot.hasMany(Log, { foreignKey: 'robot_id', onDelete: 'CASCADE' });
Log.belongsTo(Robot, { foreignKey: 'robot_id' });

Robot.hasMany(Alert, { foreignKey: 'robot_id', onDelete: 'CASCADE' });
Alert.belongsTo(Robot, { foreignKey: 'robot_id' });

module.exports = {
    sequelize,
    User,
    Robot,
    Mission,
    Log,
    Alert,
};
