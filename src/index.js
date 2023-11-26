import express from 'express';
const app = express();
app.use(express.json());
app.use(express.static("."));

import cors from 'cors';
app.use(cors());

app.listen(8080);

import rootRoute from './routes/rootRoutes.js';
app.use("/api", rootRoute);