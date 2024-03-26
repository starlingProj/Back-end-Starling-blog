import { body } from "express-validator";

export const registerValidation = [
  body("email", "Wrong Email format").isEmail(),
  body("password", "Password should consist minimum of 5 symbols").isLength({ min: 5 }),
  body("fullName", "Input Your Name").isLength({ min: 2 }),
  body("avatarUrl", "Incorrect avatar URL").optional().isURL(),
];
export const loginValidation = [
  body("email", "Wrong Email format").isEmail(),
  body("password", "Password should consist minimum of 5 symbols").isLength({ min: 5 }),
];
export const postCreateValidation = [
  body('title','Enter a title of article').isLength({min:3}).isString(),
  body('text','Enter the text of your article').isLength({min:10}).isString(),
  body('tags','Incorrect format of tags').optional().isString(),
  body('imageUrl','Incorrect image URL').optional().isString()
]