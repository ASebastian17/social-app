import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

import config from '../../config/config.js';

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (user && isPasswordCorrect) {
            const token = jwt.sign({ email: user.email, _id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
            return res.status(200).json({ token: token });
        }

        res.status(401).json({ message: 'Incorrect email or password' });
    } catch (e) {
        res.status(401).json({ message: 'Incorrect email or password' });
    }
};
