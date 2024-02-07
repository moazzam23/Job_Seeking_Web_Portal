import validator from "validator";
import mongoose from "mongoose";
import JWT  from "jsonwebtoken";
import bcrypt from "bcrypt"



const UserSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
      validate:[  validator.isEmail, "Provide Valid Email"]   },
    phone:{
        type:Number,
        required:[true,"Please Enter Your Number"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        maxlength:[15,"Max Character you can enter is 15"],
        minlength:[6,"Min Character you can enter is 6"],
        select:false,
    },
    role:{
        type:String,
        required:[true," select your role"],
        enum:["jobseeker", "employee"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  UserSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SERECT,{
        expiresIn:process.env.JWT_EXPRIE,
    });
  };

export const User = mongoose.model("User", UserSchema)