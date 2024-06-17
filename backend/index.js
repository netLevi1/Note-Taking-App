const mongoDBurl = require("./config.js");
const mongoose = require("mongoose");
const Note = require("./models/noteModel.js");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Homepage
app.get("/", (req, res) => {
  res.send("Welcome to NotesApp HomePage");
});

//get all the notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find({});
  return res.json(notes);
});

//get a specific note using id
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  return res.json(note);
});

//update a spesific note using id
app.put("/notes/:id/editNote", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.send(note);
});

//creating new note
app.post("/createNote", async (req, res) => {
  const { title, text, updated, color, tags, alarm } = req.body;
  const newNote = { title, text, updated, color, tags, alarm };
  const note = await Note.create(newNote);
  res.send(note);
});

//deleting a note using id
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  res.send(deletedNote);
});

mongoose
  .connect(mongoDBurl)
  .then(() => {
    console.log("App connected to mongoDB");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
