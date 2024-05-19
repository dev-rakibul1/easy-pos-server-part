import express from 'express'
import { PurchaseController } from './purchase.controller'

const router = express.Router()

router.post('/create-purchase', PurchaseController.CreatePurchaseController)
router.get('/', PurchaseController.GetAllPurchaseController)

export const PurchaseRoutes = router
