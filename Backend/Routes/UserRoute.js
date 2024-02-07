import express from"express";
import { Alluser, LogOut, Register, getUser, login } from "../Controller/User.js";
import { Authprovider } from "../Middlewares/Auth.js";


const router = express.Router();


router.route("/new").post(Register);
router.route("/login").post(login);
router.route("/Logout").get(Authprovider,LogOut);

router.route("/all").get(Authprovider,Alluser);

router.route("/me").get(Authprovider,getUser);


export default router;