



const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Authorization : Bearer <jwt_token> --> [1] gets teh actual token

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

module.exports = { protect, admin };
