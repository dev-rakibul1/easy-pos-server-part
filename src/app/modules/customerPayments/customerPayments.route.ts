import express from 'express'
import { CustomerPaymentController } from './customerPayments.controller'

const router = express.Router()

router.post(
  '/create-customer-payment',
  CustomerPaymentController.CreateCustomerPaymentController,
)
router.get('/', CustomerPaymentController.GetAllCustomerPaymentController)

export const CustomerPaymentRoutes = router
