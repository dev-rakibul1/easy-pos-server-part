import express from 'express'
import { CustomerController } from './customers.controller'

const router = express.Router()

router.post('/create-customer', CustomerController.CreateCustomerController)
router.get('/', CustomerController.GetAllCustomerController)

export const CustomerRoutes = router
