import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import UserRoute from "./Routes/UserRoute.js"
import JobRoute from "./Routes/JobRoute.js"
import ApplicationRoute from "./Routes/AppicationRoute.js"
import { DBConnection } from "./Database/DVCONNECTION .js";
import { Errorhandler } from "./Middlewares/Error.js";
import morgan from "morgan";

const app = express();

config({
  path: "./Config/Config.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

DBConnection();

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", ApplicationRoute);


app.use(Errorhandler)

export default app;
