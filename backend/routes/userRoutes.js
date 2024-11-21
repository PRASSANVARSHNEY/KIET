import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const userRoutes = express.Router();

userRoutes.post("/", registerUser); // Register user
userRoutes.post("/auth", authUser); // Auth user
userRoutes.post("/logout", logoutUser); // Logout user
userRoutes.post("/register", registerUser); // Duplicate Register route (can remove)
userRoutes
  .route("/profile")
  .get(protect, getUserProfile) // Get user profile
  .put(protect, updateUserProfile); // Update user profile

export default userRoutes;
