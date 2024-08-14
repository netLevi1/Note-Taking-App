import express from "express";
import { getAllUsers, getUserProfile } from "../controllers/userController.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

//get all users
router.get("/", getAllUsers);

//Retrieve user profile
router.get("/profile", authentication, getUserProfile);

export default router;
