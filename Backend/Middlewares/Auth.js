import  JWT  from "jsonwebtoken";
import  ErrorHandler  from "./Error.js";
import {TryCatch} from "./TryCatch.js"
import {User} from "../Model/User.js"

export const Authprovider =TryCatch(async(req,res,next)=>{

    const {token} =req.cookies;
    if(!token){
        return next(new ErrorHandler("Log In First" , 400)) 
    }
    const decode = JWT.verify(token, process.env.JWT_SERECT);
    const user = await User.findById(decode._id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    req.user = user;
 next();
})