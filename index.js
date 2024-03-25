import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import 'dotenv/config'

import { registerValidation } from "./validations/auth.js";

import userModel from "./models/User.js";

const app = express();

mongoose
  .connect(process.env.DB_URL  )
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log("DB error", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const doc = new userModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarURL: req.body.avatarURL,
      passwordHash:hash,
    });

    const user = await doc.save();
    const {passwordHash, ...userData} = user._doc
    const token = jwt.sign({
        _id:user._id
    }, 'blog2024',{
        expiresIn:'30d'
    })  

    res.json({
        ...userData,
        token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed",
    });
  }
});

app.listen(5000, () => {
  console.log("Server start");
});
