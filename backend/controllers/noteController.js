import User from "../models/userModel.js";
import Note from "../models/noteModel.js";

//Create a new note
export const createNote = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      const { title, text, updated, color, tags } = req.body;

      const note = new Note({ title, text, updated, color, tags });
      currUser.notes.push(note._id);
      note.owner = currUser._id;
      await note.save();
      await currUser.save();

      res.status(201).json({ message: "Note created successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating note" });
  }
};

//Retrieve notes (including subscribed notes)
export const getAllNotes = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      const notes = await Note.find({
        $or: [{ owner: currUser._id }, { subscribers: currUser._id }],
      });
      res.json(notes);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error retrieving all notes" });
  }
};

//Retrieve a specific note by ID
export const getNoteById = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      const { id } = req.params;

      const note = await Note.findById(id);
      if (note) {
        if (currUser._id.toString() !== note.owner.toString()) {
          res.status(401).json({ error: "Unauthorized" });
        } else res.json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error find note by id" });
  }
};

//Edit a specific note by ID
export const editNote = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      const { id } = req.params;
      const note = await Note.findByIdAndUpdate(id, req.body, { runValidators: true });
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error find note by id" });
  }
};

//Delete a specific note by ID
export const deleteNote = async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.username });
    if (currUser) {
      const { id } = req.params;
      const deletedNote = await Note.findByIdAndDelete(id);

      if (deletedNote) {
        res.status(201).json({ message: "Note Deleted successfully" });
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error find note by id" });
  }
};
