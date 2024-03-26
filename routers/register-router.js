import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";
import userModel from "../models/User.js";

export const registerRouter = express.Router()
 registerRouter.post('/',async(req, res) => {
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
        passwordHash: hash,
      });
  
      const user = await doc.save();
      const { passwordHash, ...userData } = user._doc;
      const token = jwt.sign(
        {
          _id: user._id,
        },
        "blog2024",
        {
          expiresIn: "30d",
        }
      );
  
      res.json({
        ...userData,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Registration failed",
      });
    }
  })