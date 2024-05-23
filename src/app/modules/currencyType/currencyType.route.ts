import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { CurrencyTypeController } from './currencyType.controller'
import { CurrencyTypeZodSchema } from './currencyType.validation'

const router = express.Router()

router.post(
  '/create-currency-type',
  ValidateZodRequest(CurrencyTypeZodSchema.CreateCurrencyTypeZodSchema),
  CurrencyTypeController.CreateCurrencyTypeController,
)
router.get('/', CurrencyTypeController.GetAllCurrencyTypeController)
router.patch('/:id', CurrencyTypeController.UpdateCurrencyTypeController)

export const CurrencyTypeRoutes = router
