import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { CustomerPurchaseController } from './customerPurchase.controller'

const router = express.Router()

router.get(
  '/get-by-current-date',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  CustomerPurchaseController.GetCustomerPurchaseByCurrentDateController,
)

router.get(
  '/get-purchase-by-customer-and-user/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  CustomerPurchaseController.GetCustomerPurchaseByCustomerAndUserController,
),
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
    CustomerPurchaseController.GetSingleCustomerPurchaseController,
  )
router.get(
  '/get-by-user-id/:id',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  CustomerPurchaseController.GetByUserIdController,
)

export const CustomerPurchaseRoutes = router
