import ErrorHandler from "../Middlewares/Error.js";
import { TryCatch } from "../Middlewares/TryCatch.js";
import { Job } from "../Model/Job.js";

export const JobCreated = TryCatch(async (req, res, next) => {
  const { role } = req.user;

  if (role === "jobseeker")
    return next(new ErrorHandler("Must have Admin access to Post a Job", 401));

  const {
    title,
    description,
    category,
    fixedsalary,
    salaryfrom,
    salaryto,
    location,
    country,
    city,
  } = req.body;

  if (!title || !description || !category || !city || !country || !location) {
    return next(new ErrorHandler("Fill All job Details", 400));
  }
  if ((!salaryfrom || !salaryto) && !fixedsalary)
    return next(new ErrorHandler("Enter fixed or either range salary", 400));

    if (salaryfrom && salaryto && fixedsalary)
    return next(new ErrorHandler("can only Enter fixed or range salary", 400));

    const createdBy= req.user._id;
const job = await Job.create({
    title,
    description,
    category,
    fixedsalary,
    salaryfrom,
    salaryto,
    location,
    country,
    city,
    createdBy
})

return res.status(200).json({
    success:true,
    message:"Job Post Successfully",
    job
})


});

export const GetAllJob = TryCatch(async (req, res, next) => {
  const job = await Job.find({ expires: false });
  if (!job) return next(new ErrorHandler("No Job Created Yet", 204));

  return res.status(200).json({
    success: true,
    job,
  });
});

export const GetMyJob= TryCatch( async(req,res,next)=>{
  const { role } = req.user;

  if (role === "jobseeker")
    return next(new ErrorHandler("Must have Admin access to Post a Job", 401));

    const job = await Job.find({createdBy:req.user._id})

    return res.status(200).json({
      success:true,
      job
    })  
  })

  export const UpdateJob= TryCatch(async(req,res,next)=>{
    const { role } = req.user;

    if (role === "jobseeker")
      return next(new ErrorHandler("Must have Admin access to Post a Job", 401));

      const {id} = req.params;
      const { expires, title, salaryfrom, salaryto, fixedsalary, description,city,country,location,category } = req.body;
      const job = await Job.findById(id);

      if(!job) return next(new ErrorHandler("No job Found", 404));

      if (expires) job.expires = expires;
  if (title) job.title = title;
  if (salaryfrom) job.salaryfrom = salaryfrom;
  if (salaryto) job.salaryto = salaryto;
  if (fixedsalary) job.fixedsalary = fixedsalary;
  if (description) job.description = description;
  if (category) job.category = category;
  if (city) job.city = city;
  if (location) job.location = location;

  await job.save();

  return res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully",
  });
  })

  export const DeleteJob = TryCatch(async(req,res,next)=>{
const { role}= req.user;

if (role === "jobseeker")
return next(new ErrorHandler("Must have Admin access to Post a Job", 401));

const {id} = req.params;


const job = await Job.findById(id);

if(!job) return next(new ErrorHandler("No job Found", 404));
await job.deleteOne();

return res.status(200).json({
  success:true,
  message:"job deleted successfully"
})

})

export const JobByID = TryCatch(async(req,res,next)=>{
  const {id} = req.params;
  
  const job = await Job.findById(id);
  
  if(!job) return next(new ErrorHandler("No job Found", 404));
  
  return res.status(200).json({
    success:true,
   job,
  })
  
  })