const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('⛔ No token or malformed header');
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🔑 Token:', token);
        console.log('🔓 Decoded:', decoded);
        console.log("JWT_SECRET in use:", process.env.JWT_SECRET);


        req.user = decoded;
        next();
    } catch (err) {
        console.log('⛔ Invalid token', err.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
