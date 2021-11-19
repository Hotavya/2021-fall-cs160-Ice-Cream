import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

import { createjobapplication } from '../controllers/jobboard.controller.js';
import { updatejobapplication } from '../controllers/jobboard.controller.js';
import { deletejobapplication } from '../controllers/jobboard.controller.js';
import {
  getjobboard,
  createjobboard,
} from '../controllers/jobboard.controller.js';

router.get('/', authenticateToken, getJobBoard);
router.post('/', authenticateToken, createJobBoard);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

export default router;
