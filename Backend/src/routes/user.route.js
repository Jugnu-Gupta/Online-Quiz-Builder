import {
    loginUser, logoutUser, registerUser, refreshAccessToken,
    UpdateUserPassword, getCurrentUser, updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Register user
router.route("/register").
    post(registerUser);

// Login user
router.route("/login").post(loginUser);

// Refresh access token
router.route("/refresh-Token").post(refreshAccessToken);

// Logout user (secured route)
router.route("/logout").post(verifyJWT, logoutUser);

// Get current user (secured route), Update user details (secured route)
router.route("/current")
    .get(verifyJWT, getCurrentUser)
    .patch(verifyJWT, updateUserDetails)

// Change user password (secured route)
router.route("/password").patch(verifyJWT, UpdateUserPassword);


export default router;