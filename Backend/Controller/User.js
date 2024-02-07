import ErrorHandler from "../Middlewares/Error.js";
import { TryCatch } from "../Middlewares/TryCatch.js"
import { User } from "../Model/User.js";
import { GenerateToken } from "../Utils/Features.js";

export const Register = TryCatch( async(req, res, next)=>{


    const {name, phone, email, role, password} = req.body;
if(!name || !phone|| !email || !role || !password) return next(new ErrorHandler("Fill All Fields", 400))

const Email= await User.findOne({email})
if(Email) return next(new ErrorHandler("Email Already Exist", 400))


const user =await User.create({
    name, phone, email, role, password
})

GenerateToken(user,200,res,"User Created Successfully")

}
)


export const login = TryCatch(async(req,res,next)=>{

    const {email,role ,password}= req.body;

    if(!email || !role || !password){
        return next(new ErrorHandler("Enter the Required Field",400))
    }
 const user = await User.findOne({email}).select("+password")
 if(!user){
    return  res.status(404).json({
        success:false,
        message:"User Not Found"
    });}


    const Ismatch = await user.matchPassword(password)
    if(!Ismatch){
        return next(new ErrorHandler("Invalid Email Or password",400))
    }
  
    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found",400))
    }

    GenerateToken(user,200,res,"Log In Successfully")
})


export const Alluser=TryCatch(async(req,res,next)=>{
    const user =  await User.find({})

    return res.status(200).json({
        success:true,
        user
    })
})


export const getUser=TryCatch(async(req,res,next)=>{

    const user =  req.user

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

 return   res.status(200).json({
        success:true,
        user,
    })
})

export const LogOut= TryCatch(async(req,res,next)=>{


  return  res.status(200).cookie("token",null,{expires:new Date(Date.now()), httpOnly:true})
        .json({
       success:true,
       message:"logged Out"
        })

})

