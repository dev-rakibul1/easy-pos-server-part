import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { DiscountController } from './discount.controller'
import { DiscountZodSchema } from './discount.validation'

const router = express.Router()

router.post(
  '/create-discount',
  ValidateZodRequest(DiscountZodSchema.CreateDiscountZodSchema),
  DiscountController.CreateDiscountController,
)
router.get('/', DiscountController.GetAllDiscountController)
router.patch(
  '/:id',
  ValidateZodRequest(DiscountZodSchema.UpdateDiscountZodSchema),
  DiscountController.UpdateDiscountController,
)

export const DiscountRoutes = router
