import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find();

    return res.status(200).json(users);
};

export const create = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 12);
    const user = new User({ ...req.body, password: password });

    try {
        await user.save();

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};

export const update = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(userId, { ...req.body, _id: userId }, { new: true });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};

export const remove = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndRemove(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};
