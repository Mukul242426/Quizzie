import express from 'express'
import {createQuiz, updateQuiz,getAllQuizzes,getQuiz,deleteQuiz} from '../controllers/quizController.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router=express.Router()

router.post('/quizzes',isAuthenticated,createQuiz)
router.patch('/quizzes/:id',isAuthenticated,updateQuiz)
router.get('/quizzes',isAuthenticated,getAllQuizzes)
router.get('/quizzes/id',isAuthenticated,getQuiz)
router.delete('/quizzes/id',isAuthenticated,deleteQuiz)

export default router;