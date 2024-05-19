import express from 'express'
import { ProductsController } from './product.controller'

const router = express.Router()

router.post('/create-product', ProductsController.CreateProductsController)
router.get('/', ProductsController.GetAllProductsController)

export const productRoutes = router
