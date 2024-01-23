import { Quiz } from "../models/quizModel.js";
import { AppError } from "../utils/appError.js";

export const createQuiz = async (req, res, next) => {
  const { name, quizType, timer, questions } = req.body;

  try {
    await Quiz.create({
      userId: req.user._id,
      name,
      quizType,
      timer,
      questions,
    });
    res.status(200).json({
      success: true,
      message: "quiz created successfully",
    });
  } catch (error) {
    next(AppError(error.message, 400));
  }
};

export const updateQuiz = async (req, res, next) => {
  const { id } = req.params;

  const { timer, impressions, questions } = req.body;

  try {
    await Quiz.findOneAndUpdate(
      { _id: id },
      { timer, impressions, questions },
      { runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Quiz Updated Successfully",
    });
  } catch (error) {
    next(AppError(error.message, 400));
  }
};

export const getAllQuizzes=(req,res,next)=>{

}

export const getQuiz=(req,res,next)=>{

}

export const deleteQuiz=(req,res,next)=>{
    
}