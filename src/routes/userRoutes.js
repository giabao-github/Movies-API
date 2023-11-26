import express from "express";
import {
    updateInfo,
    uploadAvatar,
    userLogin, userLoginFacebook,
    userSignUp
} from "../controllers/userController.js";
import { upload } from "../controllers/uploadController.js";

const userRoute = express.Router();

// signUp
// CREATE DATA
userRoute.post("/sign-up", userSignUp);

// login
userRoute.post("/login", userLogin);

// login facebook
userRoute.post("/login-facebook", userLoginFacebook);

// api update info user
userRoute.put("/update-info", updateInfo)


export default userRoute;