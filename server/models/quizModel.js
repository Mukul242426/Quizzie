import mongoose from 'mongoose'

const optionSchema=new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        required:[true,"All Fields are required"]
    },
    imageUrl:{
        type:String,
        trim:true,
        required:[true,"All Fields are required"]
    }
})

const questionSchema=new mongoose.Schema({
    questionName:{
        type:String,
        minLength:[1,"Please provide a valid question"],
        trim:true,
        required:[true,"question is required"]
    },
    optionType:{
        type:String,
        enum:{
            values:["Text","Image Url","Text & Image Url"],
            message:'{VALUE} is not a valid option type'
        },
        required:[true,"option type is required"]
    },
    options:[optionSchema],
    correctOption:{
        type:Number,
        min:-1,
        max:3,
        required:[true,"correct option is required"]
    }
})

const quizSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:[1,"Please provide a valid quiz name"],
        trim:true,
        required:[true,"quiz name is required"]
    },
    quizType:{
        type:String,
        enum:{
            values:['Q/A',"Poll"],
            message:'{VALUE} is not a valid quiz type'
        },
        required:[true,"quiz type is required"]
    },
    timer:{
        type:String,
        enum:{
            values:["OFF","5 sec","10 sec"],
            message:'{VALUE} is not a valid timer'
        },
        required:[true,"timer is required"]
    },
    questions:[questionSchema]

})

export const Quiz=mongoose.model('Quiz',quizSchema)