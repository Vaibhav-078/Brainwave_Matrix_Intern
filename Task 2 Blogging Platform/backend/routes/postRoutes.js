// backend/routes/postRoutes.js

import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser,
    createComment,
    getCommentsByPost,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.get('/my', protect, getPostsByUser);

router.route('/:id')
    .get(getPostById)
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.route('/:id/comments')
    .post(protect, createComment)
    .get(getCommentsByPost);

export default router;
