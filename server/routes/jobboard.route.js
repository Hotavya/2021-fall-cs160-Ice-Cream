import express from 'express';
const router = express.Router();

import {
  getJobBoard,
  createJobBoard,
} from '../controllers/jobboard.controller.js';

router.get('/', getJobBoard);
router.post('/', createJobBoard);

export default router;
