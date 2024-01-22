import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app=express()

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


app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL,{
        dbName:'quizDetails'
    })
    .then(()=>console.log(`Server running successfully on http://localhost:${process.env.PORT}`))
    .catch(()=>console.log(error))
})