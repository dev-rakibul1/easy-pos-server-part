import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { CustomerController } from './customers.controller'
import { CustomerZodSchema } from './customers.validation'

const router = express.Router()

router.post(
  '/create-customer',
  ValidateZodRequest(CustomerZodSchema.CreateCustomerZodSchema),
  CustomerController.CreateCustomerController,
)
router.get('/', CustomerController.GetAllCustomerController)
router.patch(
  '/:id',
  ValidateZodRequest(CustomerZodSchema.UpdateCustomerZodSchema),
  CustomerController.UpdateCustomerController,
)

export const CustomerRoutes = router
