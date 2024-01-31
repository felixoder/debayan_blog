import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//for the sign up functionaity 

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandeler(400, "All Fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, password: hashedPassword, email });
  try {
    await newUser.save();
    res.json("Signup is successful");
  } catch (error) {
    next(error);
  }
};

//For the sign in functionality

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password || username === "" || password === "") {
    next(errorHandeler(400, "All Fields are required"));
  }
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return 
      next(errorHandeler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return 
      next(errorHandeler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, 'wbswbdjbfqjwdfhjhebvjefvbkqebfvkje');
    const {password:pass, ...rest} = validUser._doc;






    res.status(200).cookie("access_token", token, {
      httpOnly: true,
    }).json(rest)
  } catch (error) {
    next(error);
  }
};
