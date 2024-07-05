import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/role'
import { AuthProvider } from '../../middlewares/auth'
import { SupplierReturnPaymentController } from './supplierReturnPayments.controller'

const router = express.Router()

router.get(
  '/get-return-payment-by-user-and-supplier/:id',
  AuthProvider.Auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CONTENT_MANAGER,
    ENUM_USER_ROLE.MARKETING_MANAGER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.USER,
  ),
  SupplierReturnPaymentController.GetReturnByUserAndSupplierController,
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
  SupplierReturnPaymentController.GetSingleSupplierReturnPaymentController,
)

export const SupplierReturnPaymentsRoutes = router
