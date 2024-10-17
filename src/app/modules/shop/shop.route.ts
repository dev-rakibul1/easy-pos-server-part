import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { ShopController } from './shop.controller'

const router = express.Router()

router.post(
  '/create-shop',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.CreateShopController,
)
router.get(
  '/',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.GetShopController,
)
router.patch(
  '/update-shop/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.UpdateShopController,
)
router.delete(
  '/delete-shop/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.DeleteShopController,
)
router.get(
  '/get-single-shop/:id',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.SingleShopController,
)
router.get(
  '/get-first',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ShopController.GetFirstShopController,
)

export const ShopRoutes = router
