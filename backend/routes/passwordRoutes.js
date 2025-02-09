import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPassword, getPassword, updatePassword, deletePassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/', authMiddleware, createPassword);
router.get('/', authMiddleware, getPassword);
router.put('/:id', authMiddleware, updatePassword);
router.delete('/:id', authMiddleware, deletePassword);

export default router;