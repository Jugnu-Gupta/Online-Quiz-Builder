import {
    loginUser, logoutUser, registerUser, getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Register user
router.route("/register").
    post(registerUser);

// Login user
router.route("/login").post(loginUser);

// Logout user (secured route)
router.route("/logout").post(verifyJWT, logoutUser);

// Get current user (secured route), Update user details (secured route)
router.route("/me")
    .get(verifyJWT, getCurrentUser)


export default router;