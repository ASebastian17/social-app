import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userId = jwt.verify(token, 'secret')?._id;

        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
