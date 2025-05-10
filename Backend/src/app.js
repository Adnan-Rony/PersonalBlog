import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import blogRoutes from './router/blogRoutes.js';
import indexRoutes from './router/index.routes.js';
import userRoutes from './router/userRoutes.js';

import AdminRoute from './router/AdminRoute.js';

dotenv.config()
const app =express()

app.use(express.json())

app.use(cookieParser())

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://devthroughts.vercel.app/api/v1",
  ],
  credentials: true,
};

app.use(cors(corsOptions));






  
app.use("/api/v1",indexRoutes); //base route for all api routes


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/blogs",blogRoutes)

app.use("/api/v1/admin",AdminRoute)

export default app;
