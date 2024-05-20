import express from 'express'
import { SellController } from './sell.controller'

const router = express.Router()

router.post('/create-sell', SellController.CreateSellController)
router.get('/', SellController.GetAllSellController)

export const SellRoutes = router
