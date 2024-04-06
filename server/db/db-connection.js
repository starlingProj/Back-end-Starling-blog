import mongoose from "mongoose";
import "dotenv/config";

export const connectDB=async()=>{
    try{
       await mongoose
        .connect(process.env.DB_URL)
        .then(() => console.log("Connection successfull"))
        .catch((err) => console.log("DB error", err));
    }
    catch{
        await mongoose.disconnect()
    }
} 