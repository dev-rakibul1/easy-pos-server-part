import express, { NextFunction, Request, Response } from 'express'
import { FileUploads } from '../../../helpers/fileUploader'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { ProductsController } from './product.controller'
import { ProductZodValidation } from './product.validation'

const router = express.Router()

router.post(
  '/create-product',

  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.createProductZodValidation.parse(
      JSON.parse(req.body.data),
    )
    return ProductsController.CreateProductsController(req, res, next)
  },
)
router.get('/', ProductsController.GetAllProductsController)
router.get('/:id', ProductsController.GetSingleProductsController)
router.patch(
  '/:id',
  ValidateZodRequest(ProductZodValidation.UpdateProductZodValidation),
  ProductsController.UpdateProductsController,
)

export const productRoutes = router
