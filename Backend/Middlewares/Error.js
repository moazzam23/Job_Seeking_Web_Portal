class ErrorHandler extends Error {
    constructor( message,  statuscode) {
      super(message);
      this.statuscode = statuscode;
  }
  }
  
 export const Errorhandler=(err,req,res,next)=>{
err.message=err.message || "Internal Server Error";
err.statuscode=err.statuscode || 500;
 
if(err.name === "CastError"){
    const message= `Resourse Not Found Invalid ${err.path}`
    err= new ErrorHandler(message, 400)  
}
if(err.code === 11000){
    const message= `Duplicate ${Object.keys(err.keysValue)} Enterend`
    err= new ErrorHandler(message, 400)  
}
if(err.name === "JsonWebTokenError"){
    const message= "Invalid Token Try Again"
    err= new ErrorHandler(message, 400)  
}
// if(err.name === "TokenExpiredError"){
//     const message= "Token Is Expired Generate New.."
//     err= new ErrorHandler(message, 400)  
// }
return res.status(err.statuscode).json({
    success:false,
    message:err.message,
})

}

export default ErrorHandler;