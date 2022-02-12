import mongoose, { Schema } from 'mongoose';

const commentSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const postSchema = mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
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
