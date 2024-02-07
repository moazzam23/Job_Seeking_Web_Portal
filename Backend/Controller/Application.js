import ErrorHandler from "../Middlewares/Error.js";
import { TryCatch } from "../Middlewares/TryCatch.js";
import { Application } from "../Model/Appilcation.js";
import cloudinary from "cloudinary";
import { Job } from "../Model/Job.js";

export const EmployeeJobResponse = TryCatch(async (req, res, next) => {
  const { role } = req.user;
  if (role === "jobseeker")
    return next(new ErrorHandler("Must have Admin access to Post a Job", 401));

  const { _id } = req.user;
  const application = await Application.find({ "applicantID.user": _id });

  return res.status(200).json({
    success: true,
    application,
  });
});
export const JobseekerJobResponse = TryCatch(async (req, res, next) => {
  const { role } = req.user;
  if (role === "employee")
    return next(
      new ErrorHandler("You have no access to have jobseeker details", 401)
    );

  const { _id } = req.user;
  const application = await Application.find({ "EmployeeID.user": _id });

  return res.status(200).json({
    success: true,
    application,
  });
});

export const Jobseekerdeleteapplication = TryCatch(async (req, res, next) => {
  const { role } = req.user;
  if (role === "employee")
    return next(
      new ErrorHandler("You have no access to have jobseeker details", 401)
    );

  const { id } = req.params;
  const application = await Application.findById(id);

  if (!application) return next(new ErrorHandler("No Application Found", 404));

  await application.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Application Deleted Successfully",
  });
});

export const CreateApplication = TryCatch(async (req, res, next) => {
  const { role } = req.user;
  if (role === "employee")
    return next(
      new ErrorHandler("You have no access to have jobseeker details", 401)
    );

  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Resume is not uploaded", 400));
  const { resume } = req.files;

  const allowedformat = ["image/png", "image/jpg", "image/webp"];
  if (!allowedformat.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Can only accept in png,jpg and webp format", 400)
    );
  }

  const cloud = await cloudinary.v2.uploader.upload(resume.tempFilePath)

  if (!cloud || cloud.error) {
    console.error(
      "Cloudinary Error:",
      cloud.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { email, name, phone, coverletter, jobID, address } = req.body;

  const applicantID = {
    user: req.user._id,
    role: "jobseeker",
  };

  if (!jobID) return next(new ErrorHandler("Job Not Found", 404));
  const jobdetail = await Job.findById(jobID);
  if (!jobdetail) return next(new ErrorHandler("Job Not Found", 404));

  const EmployeeID = {
    user: jobdetail.createdBy,
    role: "employee",
  };

  if (
    !email ||
    !name ||
    !phone ||
    !coverletter ||
    !address ||
    !applicantID ||
    !EmployeeID ||
    !resume
  ) {
    return next(new ErrorHandler("Fill All Required Fields", 404));
  }

  const application = await Application.create({
    email,
    name,
    phone,
    coverletter,
    address,
    applicantID,
    EmployeeID,
    resume:{
        public_id:cloud.public_id,
        url:cloud.secure_url
    },

  });

  res.status(200).json({
    success:true,
    application,
    message:"Application Submitted Successfully"
  })
});


