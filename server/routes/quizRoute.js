import express from "express";
import {
  createQuiz,
  updateQuiz,
  getAllQuizzes,
  getQuiz,
  deleteQuiz,
  submitQuiz,
  updateImpressions,
} from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated,createQuiz)
  .get(isAuthenticated, getAllQuizzes);
router
  .route("/:id")
  .patch(isAuthenticated, updateQuiz)
  .get(getQuiz)
  .delete(isAuthenticated, deleteQuiz);

router
  .route("/impressions/:id")
  .patch(updateImpressions);

router
  .route("/submit/:id")
  .patch(submitQuiz);

export default router;
