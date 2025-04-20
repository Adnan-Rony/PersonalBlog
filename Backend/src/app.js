import express from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'



dotenv.config()
const app =express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

export default app;
