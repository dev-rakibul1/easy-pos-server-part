import express from 'express'
import { CurrencyTypeController } from './currencyType.controller'

const router = express.Router()

router.post(
  '/create-currency-type',
  CurrencyTypeController.CreateCurrencyTypeController,
)
router.get('/', CurrencyTypeController.GetAllCurrencyTypeController)

export const CurrencyTypeRoutes = router
