import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("The database is connected");
  })
  .catch((err)=>{
    console.log('Error');
  })

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


