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

router.get('/', getjobboard);
router.post('/createjobboard', createjobboard);
router.post('/jobboard/createjobapplication', createjobapplication);
router.post('/jobboard/updatejobapplication', updatejobapplication);
router.delete('/jobboard/deletejobapplication', deletejobapplication);

export default router;