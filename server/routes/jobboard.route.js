import express from 'express';
const router = express.Router();

import { jobboard } from '../controllers/jobboard.controller.js';


router.get('/jobboard', jobboard);

export default router;