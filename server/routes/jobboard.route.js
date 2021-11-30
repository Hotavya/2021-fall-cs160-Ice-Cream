import express from 'express';
import authenticateToken from '../middleware/index.js';
const router = express.Router();

import {
  getJobBoard,
  getAllJobBoard,
  createJobBoard,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from '../controllers/jobboard.controller.js';

router.post('/', authenticateToken, createJobBoard);
router.get('/', authenticateToken, getAllJobBoard);
router.get('/:boardId', authenticateToken, getJobBoard);

router.post(
  '/:boardid/jobapplication',
  authenticateToken,
  createJobApplication
);
router.put('/:boardId/jobapplication', authenticateToken, updateJobApplication);
router.delete(
  '/:boardId/jobapplication/:applicationId',
  authenticateToken,
  deleteJobApplication
);

export default router;
