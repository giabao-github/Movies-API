import express from "express";
import {
    updateInfo,
    uploadAvatar,
    userLogin, userLoginFacebook,
    userSignUp
} from "../controllers/userController.js";
import { upload } from "../controllers/uploadController.js";

const moviesRoute = express.Router();

// signUp
// CREATE DATA
moviesRoute.post("/sign-up", userSignUp);

// login
moviesRoute.post("/login", userLogin);

// login facebook
moviesRoute.post("/login-facebook", userLoginFacebook);

// api update info user
moviesRoute.put("/update-info", updateInfo)


moviesRoute.put("/update-avatar", upload.single("file"), uploadAvatar)

export default moviesRoute;