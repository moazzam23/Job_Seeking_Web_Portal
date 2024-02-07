import express from "express";
import { Authprovider } from "../Middlewares/Auth.js";
import {
  CreateApplication,
  EmployeeJobResponse,
  JobseekerJobResponse,
  Jobseekerdeleteapplication,
} from "../Controller/Application.js";

const router = express.Router();

router.route("/employee").get(Authprovider, EmployeeJobResponse);
router.route("/jobseeker").get(Authprovider, JobseekerJobResponse);
router.route("/delete/:id").delete(Authprovider, Jobseekerdeleteapplication);
router.route("/create").post(Authprovider, CreateApplication);

export default router;
