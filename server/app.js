import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { AppError } from "./utils/appError.js"
import { globalErrorHandler } from "./middlewares/error.js"
import userRouter from "./routes/userRoute.js"
import quizRouter from "./routes/quizRoute.js"
import cors from 'cors'

const app=express()

app.use(cors({ origin: "*"}));

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Everything's fine"    
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is up and running"
    })
})

app.use('/api/v1',userRouter)
app.use('/api/v1/quizzes',quizRouter)


app.all('*',(req,res,next)=>{
    next(AppError(`cant find ${req.originalUrl} on this server`,400))
})

app.use(globalErrorHandler)

app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL,{
        dbName:'quizDetails'
    })
    .then(()=>console.log(`Server running successfully on http://localhost:${process.env.PORT}`))
    .catch((error)=>console.log(error))
})