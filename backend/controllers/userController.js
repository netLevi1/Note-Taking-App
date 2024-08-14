import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Note from "../models/noteModel.js";
import dotenv from "dotenv";

import { tokensBlackList } from "../index.js";

dotenv.config();
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

//Register new user

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error registering user" });
  }
};

//Login a user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const dataStoredInToken = { username: user.username };
    const accessToken = jwt.sign(dataStoredInToken, tokenSecret, { expiresIn: "1h" });

    res.cookie("Authorization", accessToken, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: true, // Ensures cookie is sent only over HTTPS
      sameSite: "None", // Helps protect against CSRF attacks
      maxAge: 3600000, // Cookie expiration time (1 hour in milliseconds)
    });

    res.status(200).send("Logged in successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error logging in" });
  }
};

//Logout a user
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies["Authorization"];
    tokensBlackList.set(token, Date.now());
    res.status(200).json("User logget out");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error logging in" });
  }
};

//Retrieve user profile
export const getUserProfile = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      //check wheather user is a subscriber/owner if the note
      const latestNote = await Note.find({ owner: currUser._id }).sort({ created: -1 }).limit(1);
      if (latestNote.length > 0 && latestNote[0]) {
        const note = latestNote[0];
        res.json({ username: currUser.username, sentimentAnalysis: note.sentimentAnalysisValues });
      } else {
        res.json({ username: currUser.username });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const trimemdusers = users.map((user) => {
      return user.username;
    });
    res.json(trimemdusers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error finding all users" });
  }
};
