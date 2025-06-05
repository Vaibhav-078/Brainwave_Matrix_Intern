// backend/controllers/postController.js

import asyncHandler from '../middlewares/asyncHandler.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

// Fetch all posts
const getPosts = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { title: { $regex: req.query.search, $options: 'i' } },
                { content: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const matchQuery = { ...keyword, ...category };

    const posts = await Post.aggregate([
        { $match: matchQuery },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments',
            },
        },
        {
            $addFields: {
                commentsCount: { $size: '$comments' },
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                category: 1,
                author: 1,
                createdAt: 1,
                commentsCount: 1,
            },
        },
        { $sort: { createdAt: -1 } },
    ]);

    const populatedPosts = await User.populate(posts, {
        path: 'author',
        select: 'name',
    });

    res.json(populatedPosts);
});

// Fetch single post
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// Create a post
const createPost = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const post = new Post({
        title,
        content,
        category,
        author: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
});

// Update a post
const updatePost = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    const updatedPost = await post.save();
    res.json(updatedPost);
});

// Delete a post
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
});

// Get posts by logged-in user
const getPostsByUser = asyncHandler(async (req, res) => {
    const posts = await Post.aggregate([
        { $match: { author: req.user._id } },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments',
            },
        },
        {
            $addFields: {
                commentsCount: { $size: '$comments' },
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                content: 1,
                category: 1,
                author: 1,
                createdAt: 1,
                commentsCount: 1,
            },
        },
        { $sort: { createdAt: -1 } },
    ]);

    const populatedPosts = await User.populate(posts, {
        path: 'author',
        select: 'name',
    });

    res.json(populatedPosts);
});

// Create a comment on a post
const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

      if (!content || content.trim() === '') {
        res.status(400);
        throw new Error('Comment content cannot be empty');
    }

    const post = await Post.findById(postId);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const comment = new Comment({
        content: content, 
        author: req.user._id,
        post: postId,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
});

// Get all comments for a post
const getCommentsByPost = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'name');
    res.json(comments);
});

export {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser,
    createComment,
    getCommentsByPost,
};
