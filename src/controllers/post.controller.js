import Post from '../models/Post.js';

export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate({ path: 'creator', select: ['email', 'firstName', 'lastName'] });

    return res.status(200).json(posts);
};

export const create = async (req, res) => {
    const post = new Post({ ...req.body, creator: req.userId });

    try {
        await post.save();

        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const getPostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId).populate({ path: 'creator', select: ['email', 'firstName', 'lastName'] });

        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const update = async (req, res) => {
    const { postId } = req.params;

    try {
        const _post = await Post.findById(postId);

        if (!_post) return res.status(404).json({ message: 'Post not found ' });

        if (req.userId !== _post.creator.toString()) return res.status(403).json({ message: 'Unauthorized' });

        const post = await Post.findByIdAndUpdate(postId, { ...req.body, _id: postId }, { new: true });

        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const remove = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found ' });

        if (req.userId !== post.creator.toString()) return res.status(403).json({ message: 'Unauthorized' });

        await Post.findByIdAndRemove(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const addComment = async (req, res) => {
    const { postId } = req.params;

    try {
        const comment = { comment: req.body.comment, user: req.userId };
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true });

        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};
