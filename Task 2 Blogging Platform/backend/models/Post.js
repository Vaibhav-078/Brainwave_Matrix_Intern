// backend/models/Post.js
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'Other', // A default category
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export default Post;