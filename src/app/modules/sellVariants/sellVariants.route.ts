import express from 'express'
import { SellVariantController } from './sellVariants.controller'

const router = express.Router()

router.post(
  '/create-sell-variant',
  SellVariantController.CreateSellVariantController,
)
router.get('/', SellVariantController.GetAllSellVariantController)

export const SellVariantRoutes = router
