import express from "express";
import authentication from "../utils/authentication.js";

import { createNote, getAllNotes, getNoteById, deleteNote, editNote } from "../controllers/noteController.js";

const router = express.Router();

//Create a new note
router.post("/", authentication, createNote);

//Retrieve notes (including subscribed notes)
router.get("/", authentication, getAllNotes);

//Retrieve a specific note by ID
router.get("/:id", authentication, getNoteById);

//Edit note
router.put("/:id/editNote", authentication, editNote);

//Delete specifi note by ID
router.delete("/:id", authentication, deleteNote);

export default router;
