import {
    loginUser, logoutUser, registerUser, updateUserDetails,
    UpdateUserPassword, getCurrentUser
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
router.route("/current")
    .get(verifyJWT, getCurrentUser)
    .patch(verifyJWT, updateUserDetails)

// Change user password (secured route)
router.route("/password").patch(verifyJWT, UpdateUserPassword);


export default router;