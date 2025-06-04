import express, { NextFunction, Request, Response } from 'express'
import { FileUploads } from '../../../../helpers/fileUploader'
import { WebCustomerController } from './webCustomer.controller'
import { WebCustomerZodSchema } from './webCustomer.validation'
const router = express.Router()

router.post(
  '/create-web-customer',

  // @ts-ignore
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = WebCustomerZodSchema.CreateWebCustomerZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return WebCustomerController.CreateWebUserController(req, res, next)
  },
)

export const WebCustomerRoutes = router
