import express from 'express'
import userModel from "../models/User.js";

export const infoMeRouter = express.Router()

 infoMeRouter.get('/',async (req, res) => {
    try {
      const user = await userModel.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: "User is not find",
        });
      }
      const { passwordHash, ...userData } = user._doc;
      return res.json(userData);
    } catch (e) {
      res.send(500);
    }
  })