import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { PurchaseController } from './purchase.controller'
import { PurchaseZodSchema } from './purchase.validation'

const router = express.Router()

router.post(
  '/create-purchase',
  ValidateZodRequest(PurchaseZodSchema.CreatePurchaseZodSchema),
  PurchaseController.CreatePurchaseController,
)
router.get('/', PurchaseController.GetAllPurchaseController)
router.patch(
  '/:id',
  ValidateZodRequest(PurchaseZodSchema.UpdatePurchaseZodSchema),
  PurchaseController.UpdatePurchaseController,
)

export const PurchaseRoutes = router
