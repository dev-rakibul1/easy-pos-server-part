import express from 'express'
import { PayInSupplierController } from './payInSupplier.controller'

const router = express.Router()

router.post(
  '/create-pay',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  PayInSupplierController.CreatePayInSupplierController,
)

export const PayInSupplierRoutes = router
