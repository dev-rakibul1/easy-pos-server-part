import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import ValidateZodRequest from '../../middlewares/validateRequest'
import { BrandController } from './brand.controller'
import { BrandZodValidation } from './brand.validation'

const router = express.Router()

router.post(
  '/create-brand',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  ValidateZodRequest(BrandZodValidation.createBrandZodValidation),
  BrandController.CreateBrandController,
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  BrandController.GetAllBrandController,
)
router.get(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  BrandController.GetSingleBrandController,
)
router.patch(
  '/:id',
  ValidateZodRequest(BrandZodValidation.UpdateBrandZodValidation),
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  BrandController.UpdateBrandController,
)
router.delete(
  '/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  BrandController.DeleteBrandController,
)

export const BrandRoutes = router
