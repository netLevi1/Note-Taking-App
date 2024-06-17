const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const noteSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  updated: {
    type: String,
  },
  color: {
    type: String,
    default: "white",
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
