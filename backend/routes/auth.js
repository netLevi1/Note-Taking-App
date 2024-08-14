import express from "express";
import dotenv from "dotenv";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";
import authentication from "../utils/authentication.js";

dotenv.config();
const router = express.Router();

//Register new user
router.post("/register", registerUser);

//Login a user
router.post("/login", loginUser);

//Logout a user
router.post("/logout", authentication, logoutUser);

export default router;
