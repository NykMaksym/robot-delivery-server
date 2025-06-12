require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 3200;

sequelize.authenticate()
    .then(() => {
        console.log('✅ Підключення до бази даних успішне');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Помилка підключення до БД або запуску сервера:', error);
    });
