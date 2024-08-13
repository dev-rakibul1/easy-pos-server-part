import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { VariantsController } from './variants.controller'

const router = express.Router()

router.post(
  '/create-variant',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MODERATOR,
  ),
  VariantsController.CreateVariantsController,
)
router.get('/', VariantsController.GetAllVariantsController)
router.get(
  '/last-stock-variants-count',
  // AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  VariantsController.LastStockCountController,
)
router.get('/:id', VariantsController.GetSingleVariantsController)
router.delete(
  '/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  VariantsController.DeleteSingleVariantsController,
)

export const VariantRoutes = router
