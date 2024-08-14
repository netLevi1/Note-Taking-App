import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
import usersRoute from "./routes/users.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

const mongoDBuri = process.env.MONGODB_URI;
const port = process.env.PORT;
export const tokensBlackList = new Map();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, HTTP authentication)
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/notes", notesRoute);
app.use("/users", usersRoute);

//Homepage
app.get("/", (req, res) => {
  res.send("Welcome to NotesApp HomePage");
});

mongoose
  .connect(mongoDBuri, { dbName: "Notes-App" })
  .then(() => {
    console.log("App connected to mongoDB");

    const expressServer = app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
