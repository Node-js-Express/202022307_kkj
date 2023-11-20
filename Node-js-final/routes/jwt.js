import express from 'express';
const router = express.Router();

import { login, dashboard } from '../controllers/jwt.js';
import authMiddleware from '../middleware/auth.js';

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

export default router;
