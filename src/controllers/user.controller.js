import bcrypt from 'bcrypt';

import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find();

    return res.status(200).json(users);
};

export const create = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 12);
        const user = new User({ ...req.body, password: password });

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
        const _user = await User.findById(userId);

        if (!_user) return res.status(404).json({ message: 'User not found' });

        if (req.userId !== _user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

        const user = await User.findByIdAndUpdate(userId, { ...req.body, _id: userId }, { new: true });

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};

export const remove = async (req, res) => {
    const { userId } = req.params;

    try {
        const _user = await User.findById(userId);

        if (!_user) return res.status(404).json({ message: 'User not found' });

        if (req.userId !== _user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

        await User.findByIdAndRemove(userId);

        res.status(200).json({ message: 'User deleted successfully', success: true });
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};

export const followUser = async (req, res) => {
    const { userId } = req.params; // id from the user to follow

    try {
        let user = await User.findById(req.userId);
        const userToFollow = await User.findById(userId);

        if (!userToFollow) return res.status(404).json({ messsage: 'User not found' });

        if (req.userId === userToFollow._id.toString()) return res.status(400).json({ message: 'Cannot follow yourself' });

        const index = user.following.findIndex((userId) => String(userId) === String(userToFollow._id));

        if (index === -1) {
            user.following.push(userToFollow._id);
        } else {
            user.following = user.following.filter((userId) => String(userId) !== String(userToFollow._id));
        }

        user = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ message: e.message});
    }
};
