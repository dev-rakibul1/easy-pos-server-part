import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { ColorController } from './color.controller'
import { ColorZodValidation } from './color.validation'

const router = express.Router()

router.post(
  '/create-color',
  ValidateZodRequest(ColorZodValidation.createColorZodValidation),
  ColorController.CreateColorController,
)
router.get('/', ColorController.GetAllColorController)

router.patch(
  '/:id',
  ValidateZodRequest(ColorZodValidation.UpdateColorZodValidation),
  ColorController.UpdateColorController,
)

export const ColorRoutes = router
