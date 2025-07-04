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
    "https://devthought.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ecommercetechdev.vercel.app",
    "https://adnanrony.netlify.app"
    
  ],
  credentials: true,
};

app.use(cors(corsOptions));






  
app.use("/api/v1",indexRoutes); //base route for all api routes


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/blogs",blogRoutes)

app.use("/api/v1/admin",AdminRoute)

export default app;
