import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username cannot be blank"],
      trim: true, // Trim whitespace from the beginning and end of the username
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot be more than 20 characters long"],
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    notes: [{ type: mongoose.Types.ObjectId, ref: "Note" }],
    subscribedNotes: [{ type: mongoose.Types.ObjectId, ref: "Note" }],
  },
  { collection: "users" }
);
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
export default User;
