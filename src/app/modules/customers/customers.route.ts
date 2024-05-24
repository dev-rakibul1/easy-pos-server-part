import express, { NextFunction, Request, Response } from 'express'
import { FileUploads } from '../../../helpers/fileUploader'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { CustomerController } from './customers.controller'
import { CustomerZodSchema } from './customers.validation'

const router = express.Router()

router.post(
  '/create-customer',
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CustomerZodSchema.CreateCustomerZodSchema.parse(
      JSON.parse(req.body.data),
    )
    return CustomerController.CreateCustomerController(req, res, next)
  },
)

router.get('/', CustomerController.GetAllCustomerController)
router.patch(
  '/:id',
  ValidateZodRequest(CustomerZodSchema.UpdateCustomerZodSchema),
  CustomerController.UpdateCustomerController,
)

export const CustomerRoutes = router
