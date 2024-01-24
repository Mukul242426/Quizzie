import express from "express";
import {
  createQuiz,
  updateQuiz,
  getAllQuizzes,
  getQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated,createQuiz)
  .get(isAuthenticated,getAllQuizzes);
router
  .route("/:id")
  .patch(isAuthenticated,updateQuiz)
  .get(getQuiz)
  .delete(isAuthenticated,deleteQuiz);

export default router;
