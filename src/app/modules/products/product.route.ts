import express from 'express'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { ProductsController } from './product.controller'
import { ProductZodValidation } from './product.validation'

const router = express.Router()

router.post(
  '/create-product',
  ValidateZodRequest(ProductZodValidation.createProductZodValidation),
  ProductsController.CreateProductsController,
)
router.get('/', ProductsController.GetAllProductsController)
router.get('/:id', ProductsController.GetSingleProductsController)
router.patch(
  '/:id',
  ValidateZodRequest(ProductZodValidation.UpdateProductZodValidation),
  ProductsController.UpdateProductsController,
)

export const productRoutes = router
