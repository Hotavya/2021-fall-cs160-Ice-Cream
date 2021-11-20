import express from 'express';
import authenticateToken from '../middleware/index.js';
const router = express.Router();

import { createjobapplication } from '../controllers/jobboard.controller.js';
import { updatejobapplication } from '../controllers/jobboard.controller.js';
import { deletejobapplication } from '../controllers/jobboard.controller.js';
import {
  getjobboard,
  createjobboard,
} from '../controllers/jobboard.controller.js';

router.get('/', authenticateToken, getJobBoard);
router.post('/', createJobBoard);

export default router;
