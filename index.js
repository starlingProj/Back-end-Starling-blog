import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

import "dotenv/config";
import {connectDB} from "./db/db-connection.js"
import {router} from "./router/index.js";

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api',router)

const start = async()=>{
  try {
    await connectDB()
    app.listen(PORT, ()=>console.log(`Server started on ${PORT} port`))
  } catch (error) {
    console.log(e)
  }
}
start() 