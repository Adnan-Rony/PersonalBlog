import express from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import indexRoutes from './router/index.routes.js'

dotenv.config()
const app =express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())





app.use("/api/v1",indexRoutes); //base route for all api routes






export default app;
