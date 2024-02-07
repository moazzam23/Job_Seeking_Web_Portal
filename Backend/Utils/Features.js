export const GenerateToken= (user,statuscode,res,message)=>{

    const token = user.generateToken();

    const options ={
        expires : new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true,
    }
    res.status(statuscode).cookie("token",token,options).json({
        success:true,
        message,
        user,
        token
    })}