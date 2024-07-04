import { getFeedbacks, addFeedback } from '../controllers/feedback.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// Fetch feedbacks (secured route)
router.route('/')
    .get(verifyJWT, getFeedbacks)
    .post(verifyJWT, addFeedback);


export default router;