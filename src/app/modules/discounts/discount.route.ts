import express from 'express'
import { DiscountController } from './discount.controller'

const router = express.Router()

router.post('/create-discount', DiscountController.CreateDiscountController)
router.get('/', DiscountController.GetAllDiscountController)

export const DiscountRoutes = router
