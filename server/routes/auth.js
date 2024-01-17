import express from "express";
import { userModel } from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel.findOne({ username });

  if (foundUser) {
    return res.json("user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({ username, password: hashedPassword });
  await newUser.save();

  res.json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await userModel.findOne({ username });

  if (!foundUser) {
    return res.json("User not exits, please register to continue.");
  }

  const passwordCompare = await bcrypt.compare(password, foundUser.password);

  if (!passwordCompare) {
    return res.json("Password mismatched");
  }

  const token = jwt.sign({ id: foundUser._id }, "secret");

  res.json({ token, userId: foundUser._id });
});

export { router as authRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
