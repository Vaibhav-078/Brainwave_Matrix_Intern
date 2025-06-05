// backend/routes/userRoutes.js
import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Corrected base routes
router.post('/', registerUser);         // POST /api/users => Register
router.post('/login', authUser);        // POST /api/users/login => Login
router.get('/profile', protect, getUserProfile); // GET /api/users/profile => Protected route

export default router;
