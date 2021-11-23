import express from 'express';
import authenticateToken from '../middleware/index.js';
const router = express.Router();

import {
  getJobBoard,
  createJobBoard,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from '../controllers/jobboard.controller.js';

router.post('/', authenticateToken, createJobBoard);
router.get('/:boardid', authenticateToken, getJobBoard);

router.post(
  '/:boardid/jobapplication',
  authenticateToken,
  createJobApplication
);
router.put('/:boardid/jobapplication', authenticateToken, updateJobApplication);
router.delete(
  '/:boardid/jobapplication',
  authenticateToken,
  deleteJobApplication
);

export default router;
