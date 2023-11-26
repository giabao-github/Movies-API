import express from 'express';
import moviesRoute from './moviesRoutes.js';
import userRoute from './userRoutes.js';

const rootRoute = express.Router();

rootRoute.use("/movies", moviesRoute)

rootRoute.use("/user", userRoute)


export default rootRoute;