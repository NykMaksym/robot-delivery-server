const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ заборонено: лише для адміністраторів' });
    }
    next();
};

module.exports = isAdmin;