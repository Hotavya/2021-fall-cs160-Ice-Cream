import express from 'express';
const router = express.Router();

import {
  getjobboard,
  createjobboard,
} from '../controllers/jobboard.controller.js';

router.get('/', getjobboard);
router.post('/createjobboard', createjobboard);

export default router;
