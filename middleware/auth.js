const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(`Токен: ${token}`)
    if (!token) return res.status(401).json({ message: 'Немає токена' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Недійсний токен' });
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
