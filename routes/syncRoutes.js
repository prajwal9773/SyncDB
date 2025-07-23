import express from 'express';
import { triggerSync } from '../controllers/syncController.js';

const router = express.Router();
router.post('/', triggerSync);

export default router;
