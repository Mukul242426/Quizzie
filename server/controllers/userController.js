import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return next(AppError("All Fields are required", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(AppError("User already exists", 400));
    }

    if(password.length<8){
      return next(AppError("Password must be atleast 8 characters long",400))
    }

    if(password!==confirmPassword){
      return next(AppError("passwords do not match",400))
    }

    const protectedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: protectedPassword,
      confirmPassword: protectedPassword
    });
    const jwtToken = jwt.sign(user.toJSON()._id, process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      jwtToken,
    });
  } catch (error) {
    next(AppError("All Fields are required", 400));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(AppError("All Fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(AppError("Invalid email or password", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(AppError("Invalid email or password", 400));
    }
    const jwtToken = jwt.sign(user.toJSON()._id, process.env.SECRET_KEY);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      jwtToken,
    });
  } catch (error) {
    next(error);
  }
};