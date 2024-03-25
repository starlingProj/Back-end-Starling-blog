import { body } from "express-validator";

export const registerValidation = [
  body("email", "Wrong Email format").isEmail(),
  body("password", "Password should consist minimum of 5 symbols").isLength({ min: 5 }),
  body("fullName", "Input Your Name").isLength({ min: 2 }),
  body("avatarUrl", "Incorrect avatar URL").optional().isURL(),
];
