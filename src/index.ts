import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import GlobalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes/app.routes'
import config from './config/config'
import { databaseConnect } from './utilities/server'

export const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Allows for photo access
app.use('/uploads_/', express.static('uploads_'))

// Application router or Application middleware
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Congratulations from our server' })
})

/**
 * GLOBAL ERROR HANDLING AND PRODUCTION LABEL
 */
app.use(GlobalErrorHandler)

// global error handling
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({
      success: false,
      message: 'Sorry! Not found.',
      errorMessage: [{ path: req.originalUrl, message: 'API not found!' }],
    })
  next()
})

app.listen(config.port, () => {
  console.log('Server is running now')
})

export default app

databaseConnect()
