import { getTests, addTest } from '../controllers/test.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// fetch/add tests (secured route)
router.route('/')
    .get(verifyJWT, getTests)
    .post(verifyJWT, addTest);


export default router;