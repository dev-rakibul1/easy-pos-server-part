import express from 'express'
import { SupplierPaymentController } from './supplierPayment.controller'

const router = express.Router()

router.post(
  '/create-supplier-payment',
  SupplierPaymentController.CreateSupplierPaymentController,
)
router.get('/', SupplierPaymentController.GetAllSupplierPaymentController)

export const SupplierPaymentRoutes = router
