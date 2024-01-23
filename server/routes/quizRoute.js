import express from 'express'
import {createQuiz} from '../controllers/quizController.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router=express.Router()

router.post('/quizzes',isAuthenticated,createQuiz)

export default router;