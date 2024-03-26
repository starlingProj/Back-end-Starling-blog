import express from "express";
import multer from "multer";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { connectDB } from "./db/db-connection.js";
import checkAuth from "./utils/checkAuth.js";

///Routers

import { loginRouter } from "./routers/login-router.js";
import { registerRouter } from "./routers/register-router.js";
import { infoMeRouter } from "./routers/info-me-router.js";

//Controllers

import * as PostController from "./controller/PostController.js";

const app = express();
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth/login", loginValidation, loginRouter);
app.use("/auth/register", registerValidation, registerRouter);
app.use("/auth/me", checkAuth, infoMeRouter);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file}`,
  });
});
const startApp = async () => {
  connectDB();
};
app.listen(5000, () => {
  console.log("Server start and listening on port 5000");
});
startApp();
