import express from 'express'
import admin from 'firebase-admin';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import indexRoutes from './router/index.routes.js'
import blogRoutes from './router/blogRoutes.js'
import userRoutes from './router/userRoutes.js'

import AdminRoute from './router/AdminRoute.js'

dotenv.config()
const app =express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())




app.use("/api/v1",indexRoutes); //base route for all api routes


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/blogs",blogRoutes)

app.use("/api/v1/admin",AdminRoute)

export default app;
