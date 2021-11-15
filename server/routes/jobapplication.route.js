import express from 'express';
const router = express.Router();

import { createjobapplication } from '../controllers/jobapplication.controller.js';
import { updatejobapplication } from '../controllers/jobapplication.controller.js';
import { deletejobapplication } from '../controllers/jobapplication.controller.js';


router.post('/createjobapplication', createjobapplication);
router.post('/updatejobapplication', updatejobapplication);
router.delete('/deletejobapplication', deletejobapplication);


export default router;