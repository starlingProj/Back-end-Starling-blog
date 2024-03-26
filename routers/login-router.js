import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/User.js";

export const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Authentifaction error",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({
        message: "Authentifaction error",
      });
    }
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
    return res.status(500).json({
      message: "Authentifaction error",
    });
  }
});
