import express, { NextFunction, Request, Response } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { FileUploads } from '../../../helpers/fileUploader'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { ProductsController } from './product.controller'
import { ProductZodValidation } from './product.validation'

const router = express.Router()

router.post(
  '/create-product',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  FileUploads.uploads.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.createProductZodValidation.parse(
      JSON.parse(req.body.data),
    )
    return ProductsController.CreateProductsController(req, res, next)
  },
)

router.get(
  '/stock-in',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  ProductsController.StockInProductsController,
)

router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ProductsController.GetAllProductsController,
)
router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  ProductsController.GetSingleProductsController,
)
router.patch(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ValidateZodRequest(ProductZodValidation.UpdateProductZodValidation),
  ProductsController.UpdateProductsController,
)
router.delete(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ProductsController.DeleteProductsController,
)

export const productRoutes = router
