import { getTests } from '../controllers/test.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// fetch tests (secured route)
router.route('/').get(verifyJWT, getTests);


export default router;