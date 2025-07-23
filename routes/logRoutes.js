import express from 'express';
const router = express.Router();
import { getLogs } from '../controllers/logController.js';

router.get('/', getLogs);
export default router;  