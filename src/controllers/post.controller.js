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

        if (req.userId !== _post.creator.toString()) return res.status(403).json({ message: 'Forbidden' });

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

        if (req.userId !== post.creator.toString()) return res.status(403).json({ message: 'Forbidden' });

        await Post.findByIdAndRemove(postId);

        res.status(200).json({ message: 'Post deleted successfully', success: true });
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const getPostsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const posts = await Post.find({ creator: userId });

        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ message: 'Invalid user id' });
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.params;

    try {
        let post = await Post.findById(postId);
        const index = post.likes.findIndex((userId) => userId === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((userId) => userId !== String(req.userId));
        }

        post = await Post.findByIdAndUpdate(postId, post, { new: true });

        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const getPostComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        res.status(200).json(post.comments);
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

export const getComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const post = await Post.findById(postId);

        const comment = post.comments.filter((comment) => comment._id.toString() === commentId);

        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json({ message: 'Invalid post id' });
    }
};

export const getPostsByTag = async (req, res) => {
    const tag = new RegExp(`^${req.params.tag}$`, 'i');

    const posts = await Post.find({ tags: { $in: tag } });

    res.status(200).json(posts);
};
