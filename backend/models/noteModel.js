import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    updated: {
      type: Date,
      default: Date.now,
    },
    color: {
      type: String,
      default: "white",
    },
    tags: {
      type: [String],
      default: [],
    },
    owner: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    subscribers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { collection: "notes" }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
