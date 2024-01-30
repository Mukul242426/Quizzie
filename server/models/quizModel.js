import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    default: "",
  },
  imageUrl: {
    type: String,
    trim: true,
    default: "",
  },
  count:{
    type:Number,
    default:0
  }
});

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    minLength: [1, "Please provide a valid question"],
    trim: true,
    required: [true, "question is required"],
  },
  optionType: {
    type: String,
    enum: {
      values: ["Text", "Image Url", "Text & Image Url"],
      message: "{VALUE} is not a valid option type",
    },
    required: [true, "option type is required"],
  },
  options: [optionSchema],
  correctOption: {
    type: Number,
    min: -1,
    max: 3,
    default: -1,
  },
  attempts:{
    type:Number,
    default:0
  },
  correctAttempts:{
    type:Number,
    default:0
  },
  incorrectAttempts:{
    type:Number,
    default:0
  }
});

const quizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    minLength: [1, "Please provide a valid quiz name"],
    trim: true,
    required: [true, "quiz name is required"],
  },
  quizType: {
    type: String,
    enum: {
      values: ["Q/A", "Poll"],
      message: "{VALUE} is not a valid quiz type",
    },
    required: [true, "quiz type is required"],
  },
  timer: {
    type: String,
    enum: {
      values: ["","OFF", "5 sec", "10 sec"],
      message: "{VALUE} is not a valid timer",
    }
  },
  impressions:{
    type:Number,
    default:0
  },
  createdOn:{
    type:Date,
    default:Date.now
  },
  questions: [questionSchema],
});

export const Quiz = mongoose.model("Quiz", quizSchema);
