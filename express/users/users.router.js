import { Router } from 'express';
import UsersController from './users.controller.js';

const router = Router();

router.post('/register', UsersController.register);

export default router;