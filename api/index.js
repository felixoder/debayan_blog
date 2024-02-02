import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Use express.json() middleware
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO ||'mongodb+srv://felix:fgIV5oOtf5iWsRpz@mern-blog.wjyv65z.mongodb.net/mern-blog?retryWrites=true&w=majority')
  .then(() => {
    console.log("The database is connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode ||500
  const message = err.message
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })

})
