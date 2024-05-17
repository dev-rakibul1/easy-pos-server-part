import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import router from './app/routes/app.routes'
import { databaseConnect } from './utilities/server'
export const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Application router or Application middleware
app.use('/api/v1', router)

const abc = 'abc


/**
 * GLOBAL ERROR HANDLING AND PRODUCTION LABEL
 */

// app.use(globalErrorHandler);

// global error handling
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not fount.',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found!',
      },
    ],
  })
  next()
})

databaseConnect()
