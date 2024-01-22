import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"All Fields are required"],
    },
    email:{
        type:String,
        required:[true,"All Fields are required"],
        unique:true
    }
})