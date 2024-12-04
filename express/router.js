import { Router } from 'express';
import companiesRouter from './companies/companies.router.js';
import eventsRouter from './events/events.router.js';
import usersRouter from './users/users.router.js';

const router = Router();

router.use('/api/companies', companiesRouter);
router.use('/api/events', eventsRouter);
router.use('/api/users', usersRouter);

export default router;