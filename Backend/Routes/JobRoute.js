import express from "express";
import {
  DeleteJob,
  GetAllJob,
  GetMyJob,
  JobByID,
  JobCreated,
  UpdateJob,
} from "../Controller/JobContr.js";
import { Authprovider } from "../Middlewares/Auth.js";

const router = express.Router();

router.route("/new").post(Authprovider, JobCreated);
router.route("/all").get(GetAllJob);
router.route("/my").get(Authprovider, GetMyJob);
router.route("/update/:id").put(Authprovider, UpdateJob);
router.route("/delete/:id").delete(Authprovider, DeleteJob);
router.route("/:id").get(Authprovider, JobByID);

export default router;
