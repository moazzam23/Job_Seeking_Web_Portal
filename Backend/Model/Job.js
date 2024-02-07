import mongoose from "mongoose";

const JobSchema= new mongoose.Schema({
    
    title:{
        type:String,
        required:[true,"Please Job Title"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Job Description"],
 },
    category:{
        type:String,
        required:[true,"Please Enter Category"],
    },
    country:{
        type:String,
        required:[true,"Please Enter Country "],
    },
    city:{
        type:String,
        required:[true," select your City"],
    },
    location:{
        type:String,
        required:[true,"Enter your exact location"]
    },
    fixedsalary:{
        type:Number,
       },
    salaryfrom:{
        type:Number,
      },
    salaryto:{
        type:Number,
      },
    expires:{
type:Boolean,
default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }

})

export const Job = mongoose.model("Job", JobSchema)