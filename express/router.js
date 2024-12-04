import { Router } from 'express';
import eventsRouter from './events/events.router.js';
import companiesRouter from './companies/companies.router.js';
import authRouter from './auth/auth.router.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/companies', companiesRouter);
router.use('/auth', authRouter);

export default router;