import jwt from "jsonwebtoken";
import { AppError} from "../utils/appError.js";

export const isAuthenticated = (req, res, next) => {
  try {
    let jwttoken = req.headers.authorization;
   
    if (!jwttoken) {
      return next(AppError("Please provide a valid token", 400));
    }
    jwttoken=jwttoken.slice(7)
    const user = jwt.verify(jwttoken,process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    next(AppError("You are not logged in !! Please login", 400));
  }
};