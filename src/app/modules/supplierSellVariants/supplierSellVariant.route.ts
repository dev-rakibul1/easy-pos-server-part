import express from 'express'
import { SupplierSellVariantsController } from './supplierSellVariant.controller'

const router = express.Router()

router.get(
  '/:id',
  // AuthProvider.Auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.CONTENT_MANAGER,
  //   ENUM_USER_ROLE.MARKETING_MANAGER,
  //   ENUM_USER_ROLE.MODERATOR,
  //   ENUM_USER_ROLE.USER,
  // ),
  SupplierSellVariantsController.GetManyBySupplierSellVariantsIdController,
)

export const SupplierSellVariantsRoutes = router
