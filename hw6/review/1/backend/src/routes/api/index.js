import { Router } from 'express';
import scoreCardRouter from './scoreCard.js';

const router = Router();

router.use('/', scoreCardRouter);

export default router;
