import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { SupplierController } from './supplier.controller'
import { SupplierZodSchema } from './supplier.validation'

const router = express.Router()

router.post(
  '/create-supplier',
  ValidateZodRequest(SupplierZodSchema.CreateSupplierZodSchema),
  SupplierController.CreateSupplierController,
)
router.get('/', SupplierController.GetAllSupplierController)
router.patch(
  '/:id',
  ValidateZodRequest(SupplierZodSchema.UpdateSupplierZodSchema),
  SupplierController.UpdateSupplierController,
)

export const SupplierRoutes = router
