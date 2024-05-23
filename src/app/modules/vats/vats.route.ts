import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { VatController } from './vats.controller'
import { VatsZodSchema } from './vats.validation'

const router = express.Router()

router.post(
  '/create-vat',
  ValidateZodRequest(VatsZodSchema.CreateVatsZodSchema),
  VatController.CreateVatController,
)
router.get('/', VatController.GetAllVatController)
router.patch(
  '/:id',
  ValidateZodRequest(VatsZodSchema.UpdateVatsZodSchema),
  VatController.UpdateVatController,
)

export const VatRoutes = router
