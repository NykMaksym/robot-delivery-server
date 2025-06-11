const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const missionRoutes = require('./routes/missions');
const robotRoutes = require('./routes/robots');
const logRoutes = require('./routes/logs');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');
const authenticateToken = require("./middleware/auth");

app.use('/api/missions', authenticateToken, missionRoutes);
app.use('/api/robots', authenticateToken, robotRoutes);
app.use('/api/logs', authenticateToken, logRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ресурс не знайдено' });
});

app.use((req, res) => {
    console.error('Помилка:', err.stack);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
});

module.exports = app;
