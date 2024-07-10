import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { SellController } from './sell.controller'

const router = express.Router()

router.post(
  '/create-sell',
  AuthProvider.Auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SellController.CreateSellController,
)
router.get(
  '/',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellController,
)
router.get(
  '/get-sell-by-current-date',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.GetAllSellByCurrentDateController,
)
router.get(
  '/sell-get-by-customer-purchase-product-id/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.MODERATOR,
  ),
  SellController.SellGetByCustomerPurchaseIdController,
)

export const SellRoutes = router
