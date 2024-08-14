import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokensBlackList } from "../index.js";

dotenv.config();
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authentication = (req, res, next) => {
  const token = req.cookies["Authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized!" });
  }
  if (tokensBlackList.has(token)) {
    if (Date.now() - tokensBlackList.get(token) > 3600000) tokensBlackList.delete(token);
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decodedPayload = jwt.verify(token, tokenSecret);
    req.username = decodedPayload.username;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Authentication failed");
  }
};

export default authentication;
