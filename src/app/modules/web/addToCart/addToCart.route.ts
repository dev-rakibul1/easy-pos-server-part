import express from 'express'
import { AddToCartController } from './addToCart.controller'

const router = express.Router()

router.post('/add-to-cart', AddToCartController.CreateAddToCartController)
router.get('/', AddToCartController.GetAllAddToCartController)

export const AddToCartRoutes = router
