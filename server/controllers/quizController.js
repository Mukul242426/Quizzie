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
    const quiz=await Quiz.findOneAndUpdate(
      { _id: id,userId:req.user._id },
      { timer, impressions, questions },
      { runValidators: true }
    );
    if(!quiz){
      return next("you cannot update someone else's quiz",400)
    }
    res.status(200).json({
      success: true,
      message: "Quiz Updated Successfully",
    });
  } catch (error) {
    next(AppError(error.message, 400));
  }
};

export const getAllQuizzes = async (req, res, next) => {
  try {
    const quiz = await Quiz.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      results: quiz.length,
      quiz,
    });
  } catch (error) {
    next(AppError(error.message, 400));
  }
};

export const getQuiz = async (req, res, next) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findOne({ _id: id });
    if (!quiz) {
      return next(AppError("Invalid quiz link", 400));
    }
    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    next(AppError("Invalid quiz link", 400));
  }
};

export const deleteQuiz = async (req, res, next) => {
  const { id } = req.params;

  try {
    const quiz=await Quiz.findOneAndDelete({_id:id,userId:req.user._id})
    if(!quiz){
      return next(AppError("you cannot delete someone else's quiz",400))
    }
    res.status(200).json({
      success:true,
      message:"quiz deleted successfully"
    })
  } catch (error) {
    next(AppError(error.message,400))
  }
};
