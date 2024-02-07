import mongoose from "mongoose";
import validator from "validator";


const ApplicationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"please Enter Your email"],
        validate:[  validator.isEmail, "Provide Valid Email"]   
    },
    phone:{
        type:Number,
        required:[true,"please Enter Your number"]
    },
    coverletter:{
        type:String,
        required:[true,"please Enter Your Name"]
    },
    resume:{
     public_id:{
        type:String,
        required:true
     },
     url:{
        type:String,
        required:true
     },
    },
    address:{
        type:String,
        required:[true,"please Enter Your address"]
    },
    applicantID:{
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"please Enter Your Name"]
    },
    role:{
        type:String,
        enum:["jobseeker"],
        required:true,
    }
},
    EmployeeID:{
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"please Enter Your Name"]
    },
    role:{
        type:String,
        enum:["employee"],
        required:true,
    }

},

})

export const Application = mongoose.model("Application",ApplicationSchema)