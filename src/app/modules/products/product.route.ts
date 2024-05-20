import express from 'express'
import { ProductsController } from './product.controller'

const router = express.Router()

router.post('/create-product', ProductsController.CreateProductsController)
router.get('/', ProductsController.GetAllProductsController)
router.get('/:id', ProductsController.GetSingleProductsController)

export const productRoutes = router
