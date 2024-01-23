import { Quiz } from '../models/quizModel.js'
import { AppError } from '../utils/appError.js'

export const createQuiz=(req,res,next)=>{
   const {name,quizType,timer,questions}=req.body;

//    console.dir({name,quizType,timer,questions},{depth:null})


   
   res.send("Quiz created")
}