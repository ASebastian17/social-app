import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const postSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    message: {
        type: String,
        trim: true,
        default: '',
    },
    postImage: {
        type: String,
        default: null,
    },
    tags: {
        type: [String],
        default: null,
    },
    comments: {
        type: [commentSchema],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Post', postSchema);
